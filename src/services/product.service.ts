import { getCachedData, setCachedData } from '@/utils';
import { fetchListProducts, fetchProductDetail } from '@/api';
import { type Product, type ProductDetail } from '@/models';
import { adaptListProducts, adaptProductDetail } from '@/adapters';

/**
 * Obtiene la lista de todos los productos
 * Usa caché con expiración de 1 hora para optimizar las peticiones
 * @throws Error si la petición falla o los datos son inválidos y error en la adaptación
 * @returns Lista de productos (ProductsList)
 */
export async function getProducts(): Promise<Product[]> {
    const cacheKey = 'products';
    
    try {
        // Intentar obtener de la caché primero
        const cachedData = getCachedData<Product[]>(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        // Si no hay caché, obtener del API
        const apiProducts = await fetchListProducts(); // throws
        const adaptedProducts = adaptListProducts(apiProducts); // throws
        
        // Guardar en caché
        setCachedData(cacheKey, adaptedProducts);

        return adaptedProducts;
    } catch (error) {
        // Gestionsr errores de forma centralizada si se necesita en el futuro :)
        throw new Error('[getProducts] Error obteniendo los productos -> ' + (error instanceof Error ? error.message : 'Error desconocido'));
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
        const apiProductDetail = await fetchProductDetail(productId); // throws
        const adaptedProductDetail = adaptProductDetail(apiProductDetail); // throws
        
        // Guardar en caché
        setCachedData(cacheKey, adaptedProductDetail);

        return adaptedProductDetail;
    } catch (error) {
        // Gestionsr errores de forma centralizada si se necesita en el futuro :)
        throw new Error(`[getProductDetail] Error al obtener el detalle del producto ${productId} -> ` + (error instanceof Error ? error.message : 'Error desconocido'));
    }
}