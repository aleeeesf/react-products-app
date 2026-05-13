const BASE_URL = 'https://itx-frontend-test.onrender.com/api';

/**
 * Obtiene la lista de productos de la API
 * @throws Error si la petición falla
 * @returns Respuesta de la API
 */
export async function fetchListProducts(): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/product`, {
            headers: { 'Content-Type': 'application/json' },
            signal: AbortSignal.timeout(10000) // 10s timeout
        });

        if (!response.ok) {
            throw new Error(
                `[fetchListProducts] Error Fetch API - Status ${response.status}: ${response.statusText || 'Error desconocido al obtener la lista de productos de la API'}`
            );
        }

        const data = await response.json();
        return data;

    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('[fetchListProducts] Error de red: no se pudo conectar con la API');
        }
        if (error instanceof SyntaxError) {
            throw new Error('[fetchListProducts] La API devolvió un JSON inválido');
        }
        throw error;
    }
}

/**
 * Obtiene los detalles de un producto específico del API
 * @param id - ID del producto a obtener
 * @throws Error si la petición falla, el producto no existe o la respuesta es inválida
 * @returns Objeto con detalles del producto del API
 */
export async function fetchProductDetail(id: string): Promise<any> {
    if (!id || typeof id !== 'string') {
        throw new Error('[fetchProductDetail] El ID de producto proporcionado no es válido');
    }

    try {
        const response = await fetch(`${BASE_URL}/product/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            signal: AbortSignal.timeout(10000) // 10s timeout
        });

        if (response.status === 404) {
            throw new Error(`[fetchProductDetail] Producto con ID ${id} no encontrado`);
        }

        if (!response.ok) {
            throw new Error(
                `[fetchProductDetail] Error Fetch API - Status ${response.status}: ${response.statusText || `Error desconocido al obtener el detalle del producto con ID ${id} de la API`}`
            );
        }

        const data = await response.json();
        return data;

    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('[fetchProductDetail] Error de red: no se pudo conectar con la API');
        }
        if (error instanceof SyntaxError) {
            throw new Error('[fetchProductDetail] La API devolvió un JSON inválido');
        }
        throw error;
    }
}