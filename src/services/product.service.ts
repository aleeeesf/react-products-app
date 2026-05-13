import { getCachedData, setCachedData } from '@/utils';
import { fetchListProducts, fetchProductDetail } from '@/api';
import { type ProductsList, type ProductDetail } from '@/models';
import { adaptListProducts, adaptProductDetail } from '@/adapters';

/**
 * Obtiene la lista de todos los productos
 * Usa caché con expiración de 1 hora para optimizar las peticiones
 * @throws Error si la petición falla, los datos son inválidos y error en la adaptación o
 * o error al guardar en caché
 * @returns Lista de productos (ProductsList)
 */
export async function getProducts(): Promise<ProductsList> {
    const cacheKey = 'products';
    
    try {
        // Intentar obtener de la caché primero
        const cachedData = getCachedData<ProductsList>(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        // Si no hay caché, obtener del API
        const apiProducts = await fetchListProducts(); // throws
        const adaptedProducts = adaptListProducts(apiProducts); // throws
        
        // Guardar en caché
        setCachedData(cacheKey, adaptedProducts); // throws

        return adaptedProducts;
    } catch (error) {
        // Gestionsr errores de forma centralizada si se necesita en el futuro :)
        console.error('[getProducts] Error obteniendo los productos (', error instanceof Error ? error.message : error, ')');
        throw error;
    }
}

/**
 * Obtiene los detalles de un producto específico
 * Usa caché con expiración de 1 hora para optimizar las peticiones
 * @param productId - ID único del producto a obtener
 * @throws Error si el ID es inválido, la petición falla, los datos son inválidos, o hay error en la adaptación
 * @returns ProductDetail con toda la información del producto
 */
export async function getProductDetail(productId: string): Promise<ProductDetail> {
    // Validar que el ID no esté vacío
    if (!productId || typeof productId !== 'string' || productId.trim() === '') {
        throw new Error('El ID de producto proporcionado no es válido');
    }

    const cacheKey = `product_${productId}`;

    try {
        // Intentar obtener de la caché primero
        const cachedData = getCachedData<ProductDetail>(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        // Si no hay caché, obtener de la API
        const apiProductDetail = await fetchProductDetail(productId);
        const adaptedProductDetail = adaptProductDetail(apiProductDetail);
        
        // Guardar en caché
        setCachedData(cacheKey, adaptedProductDetail);

        return adaptedProductDetail;
    } catch (error) {
        // Gestionsr errores de forma centralizada si se necesita en el futuro :)
        console.error(`[getProductDetail] Error obteniendo el detalle del producto ${productId} (`, error instanceof Error ? error.message : error, ')');
        throw error;
    }
}