import { type ProductsList, type ProductDetail } from '@/models';

/**
 * Adapta la respuesta de la API de lista de productos al modelo
 * de lista de productos (ProductsList).
 * @param apiResponse - Array de productos del API
 * @throws Error si la estructura de datos es inválida
 * @returns Objeto ProductsList adaptado
 */
export function adaptListProducts(apiResponse: any): ProductsList {
    try {
        // Validamos que sea un array
        if (!Array.isArray(apiResponse)) {
            throw new Error('Se esperaba un array de productos del API');
        }

        const products = apiResponse.map((product: any, index: number) => {
            // Validar que cada producto tiene las propiedades requeridas
            if (!product || typeof product !== 'object') {
                throw new Error(`Producto en el índice ${index} no es un objeto válido`);
            }

            if (!product.id) {
                throw new Error(`Producto en el índice ${index} no tiene la propiedad "id"`);
            }

            // Garantizamos que todas las propiedades existan
            return {
                id: String(product.id).trim(),
                brand: String(product.brand || 'Desconocida').trim(),
                model: String(product.model || 'Desconocido').trim(),
                price: String(product.price || 'No disponible').trim(),
                imgUrl: String(product.imgUrl || 'No disponible').trim()
            };
        });

        return { products };
    } catch (error) {
        throw new Error(`Error adapatando lista de productos de API a modelo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
}

/**
 * Adapta la respuesta de la API de detalle de producto al
 * modelo de detalle de producto (ProductDetail).
 * @param apiResponse - Objeto producto detallado de la API
 * @throws Error si la estructura de datos es inválida
 * @returns Objeto ProductDetail adaptado
 */
export function adaptProductDetail(apiResponse: any): ProductDetail {
    try {
        // Validar que sea un objeto
        if (!apiResponse || typeof apiResponse !== 'object' || Array.isArray(apiResponse)) {
            throw new Error('Se esperaba un objeto de detalle de producto del API');
        }

        // Validar propiedades críticas
        if (!apiResponse.id) {
            throw new Error('El producto no tiene la propiedad "id"');
        }

        const adaptedDetail: ProductDetail = {
            id: String(apiResponse.id).trim(),
            brand: String(apiResponse.brand || 'Desconocida').trim(),
            model: String(apiResponse.model || 'Desconocido').trim(),
            price: String(apiResponse.price || 'No disponible').trim(),
            imgUrl: String(apiResponse.imgUrl || 'No disponible').trim(),
            networkTechnology: String(apiResponse.networkTechnology || 'N/A').trim(),
            networkSpeed: String(apiResponse.networkSpeed || 'N/A').trim(),
            gprs: String(apiResponse.gprs || 'N/A').trim(),
            edge: String(apiResponse.edge || 'N/A').trim(),
            announced: String(apiResponse.announced || 'N/A').trim(),
            status: String(apiResponse.status || 'N/A').trim(),
            dimentions: String(apiResponse.dimentions || 'N/A').trim(),
            weight: String(apiResponse.weight || 'N/A').trim(),
            sim: String(apiResponse.sim || 'N/A').trim(),
            displayType: String(apiResponse.displayType || 'N/A').trim(),
            displayResolution: String(apiResponse.displayResolution || 'N/A').trim(),
            displaySize: String(apiResponse.displaySize || 'N/A').trim(),
            os: String(apiResponse.os || 'N/A').trim(),
            cpu: String(apiResponse.cpu || 'N/A').trim(),
            chipset: String(apiResponse.chipset || 'N/A').trim(),
            gpu: String(apiResponse.gpu || 'N/A').trim(),
            externalMemory: String(apiResponse.externalMemory || 'N/A').trim(),
            internalMemory: ensureArray(apiResponse.internalMemory),
            ram: String(apiResponse.ram || 'N/A').trim(),
            primaryCamera: ensureArray(apiResponse.primaryCamera),
            // ! API devuelve "secondaryCmera" con typo, lo normalizamos a "secondaryCamera"
            secondaryCamera: ensureArray(apiResponse.secondaryCmera),
            speaker: String(apiResponse.speaker || 'N/A').trim(),
            audioJack: String(apiResponse.audioJack || 'N/A').trim(),
            wlan: ensureArray(apiResponse.wlan),
            bluetooth: ensureArray(apiResponse.bluetooth),
            gps: String(apiResponse.gps || 'N/A').trim(),
            nfc: String(apiResponse.nfc || 'N/A').trim(),
            radio: String(apiResponse.radio || 'N/A').trim(),
            usb: String(apiResponse.usb || 'N/A').trim(),
            sensors: ensureArray(apiResponse.sensors),
            battery: String(apiResponse.battery || 'N/A').trim(),
            colors: ensureArray(apiResponse.colors),
            options: {
                colors: Array.isArray(apiResponse.options.colors)
                    ? apiResponse.options.colors.map((c: any) => ({
                        code: Number(c?.code ?? 0),
                        name: String(c?.name || 'Desconocido').trim()
                    }))
                    : [],
                storages: Array.isArray(apiResponse.options.storages)
                    ? apiResponse.options.storages.map((s: any) => ({
                        code: Number(s?.code ?? 0),
                        name: String(s?.name || 'Desconocido').trim()
                    }))
                    : []
            }
        };

        return adaptedDetail;
    } catch (error) {
        throw new Error(`Error adapatando detalle de producto de API a modelo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
}

/**
 * Helper para asegurar valores en un array de strings
 * @param value - Valor que puede ser un string, un array o nulo
 * @returns Array de strings garantizado
 */
 const ensureArray = (value: any): string[] => {
    if (Array.isArray(value)) return value.map(v => String(v || ''));
    if (value) return [String(value)];
    return [];
};