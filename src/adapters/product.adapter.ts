import { type Product, type ProductDetail, type ProductOptions } from '@/models';

/**
 * Adapta la respuesta de la API de lista de productos al modelo
 * de lista de productos (ProductsList).
 * @param apiResponse - Array de productos del API
 * @throws Error si la estructura de datos es inválida
 * @returns Objeto ProductsList adaptado
 */
export function adaptListProducts(apiResponse: any): Product[] {
    try {
        // Validamos que sea un array
        if (!Array.isArray(apiResponse)) {
            throw new Error('Se esperaba un array de productos del API');
        }

        const products = apiResponse.map((product: any, index: number) => {
            // Validar que cada producto es un objeto válido
            if (!product || typeof product !== 'object') {
                throw new Error(`Producto en el índice ${index} no es un objeto válido`);
            }

            // Validar que tiene ID -> propiedad crítica
            if (!product.id) {
                throw new Error(`Producto en el índice ${index} no tiene la propiedad "id"`);
            }

            // Garantizamos que todas las propiedades existan
            return {
                id: String(product.id).trim(),
                brand: product.brand ? String(product.brand).trim() : 'Desconocida',
                model: product.model ? String(product.model).trim() : 'Desconocido',
                price: product.price ? String(product.price).trim() : 'No disponible',
                imgUrl: product.imgUrl ? String(product.imgUrl).trim() : 'No disponible'
            };
        });

        return products;
    } catch (error) {
        throw new Error(`[adaptListProducts] Error adapatando lista de productos de API a modelo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
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

        // Base del producto (requerido)
        const adaptedDetail: ProductDetail = {
            id: String(apiResponse.id).trim(),
            brand: apiResponse.brand ? String(apiResponse.brand).trim() : 'Desconocida',
            model: apiResponse.model ? String(apiResponse.model).trim() : 'Desconocido',
            price: apiResponse.price ? String(apiResponse.price).trim() : 'No disponible',
            imgUrl: apiResponse.imgUrl ? String(apiResponse.imgUrl).trim() : 'No disponible'
        };

        // Agregar propiedades opcionales solo si existen en la respuesta
        if (apiResponse.networkTechnology) adaptedDetail.networkTechnology = String(apiResponse.networkTechnology).trim();
        if (apiResponse.networkSpeed) adaptedDetail.networkSpeed = String(apiResponse.networkSpeed).trim();
        if (apiResponse.gprs) adaptedDetail.gprs = String(apiResponse.gprs).trim();
        if (apiResponse.edge) adaptedDetail.edge = String(apiResponse.edge).trim();
        if (apiResponse.announced) adaptedDetail.announced = String(apiResponse.announced).trim();
        if (apiResponse.status) adaptedDetail.status = String(apiResponse.status).trim();
        if (apiResponse.dimentions) adaptedDetail.dimentions = String(apiResponse.dimentions).trim();
        if (apiResponse.weight) adaptedDetail.weight = String(apiResponse.weight).trim();
        if (apiResponse.sim) adaptedDetail.sim = String(apiResponse.sim).trim();
        if (apiResponse.displayType) adaptedDetail.displayType = String(apiResponse.displayType).trim();
        if (apiResponse.displayResolution) adaptedDetail.displayResolution = String(apiResponse.displayResolution).trim();
        if (apiResponse.displaySize) adaptedDetail.displaySize = String(apiResponse.displaySize).trim();
        if (apiResponse.os) adaptedDetail.os = String(apiResponse.os).trim();
        if (apiResponse.cpu) adaptedDetail.cpu = String(apiResponse.cpu).trim();
        if (apiResponse.chipset) adaptedDetail.chipset = String(apiResponse.chipset).trim();
        if (apiResponse.gpu) adaptedDetail.gpu = String(apiResponse.gpu).trim();
        if (apiResponse.externalMemory) adaptedDetail.externalMemory = String(apiResponse.externalMemory).trim();
        if (apiResponse.internalMemory) adaptedDetail.internalMemory = ensureArray(apiResponse.internalMemory);
        if (apiResponse.ram) adaptedDetail.ram = String(apiResponse.ram).trim();
        if (apiResponse.primaryCamera) adaptedDetail.primaryCamera = ensureArray(apiResponse.primaryCamera);
        // ! API devuelve "secondaryCmera" con typo, lo normalizamos a "secondaryCamera"
        if (apiResponse.secondaryCmera) adaptedDetail.secondaryCamera = ensureArray(apiResponse.secondaryCmera);
        if (apiResponse.speaker) adaptedDetail.speaker = String(apiResponse.speaker).trim();
        if (apiResponse.audioJack) adaptedDetail.audioJack = String(apiResponse.audioJack).trim();
        if (apiResponse.wlan) adaptedDetail.wlan = ensureArray(apiResponse.wlan);
        if (apiResponse.bluetooth) adaptedDetail.bluetooth = ensureArray(apiResponse.bluetooth);
        if (apiResponse.gps) adaptedDetail.gps = String(apiResponse.gps).trim();
        if (apiResponse.nfc) adaptedDetail.nfc = String(apiResponse.nfc).trim();
        if (apiResponse.radio) adaptedDetail.radio = String(apiResponse.radio).trim();
        if (apiResponse.usb) adaptedDetail.usb = String(apiResponse.usb).trim();
        if (apiResponse.sensors) adaptedDetail.sensors = ensureArray(apiResponse.sensors);
        if (apiResponse.battery) adaptedDetail.battery = String(apiResponse.battery).trim();
        if (apiResponse.colors) adaptedDetail.colors = ensureArray(apiResponse.colors);

        // Manejar opciones de compra (colores y almacenamientos)
        // Solo se agrega si existe la estructura options en la respuesta
        if (apiResponse.options && typeof apiResponse.options === 'object') {
            const options: ProductOptions = {};

            if (Array.isArray(apiResponse.options.colors)) {
                options.colors = apiResponse.options.colors.map((c: any) => ({
                    code: Number(c?.code ?? 0),
                    name: c?.name ? String(c.name).trim() : 'Desconocido'
                }));
            }

            if (Array.isArray(apiResponse.options.storages)) {
                options.storages = apiResponse.options.storages.map((s: any) => ({
                    code: Number(s?.code ?? 0),
                    name: s?.name ? String(s.name).trim() : 'Desconocido'
                }));
            }

            if (Object.keys(options).length > 0) {
                adaptedDetail.options = options;
            }
        }

        return adaptedDetail;
    } catch (error) {
        throw new Error(`[adaptProductDetail] Error adapatando detalle de producto de API a modelo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
}

/**
 * Convierte un valor a un array de strings
 * @param value - Valor que puede ser un string, un array o undefined
 * @returns Array de strings, vacío si el valor es undefined/null
 */
const ensureArray = (value: any): string[] => {
    if (Array.isArray(value)) {
        return value
            .map(v => {
                const str = String(v ?? '').trim();
                return str;
            })
            .filter(str => str.length > 0); // Filtra strings vacíos
    }
    if (value) {
        const str = String(value).trim();
        return str.length > 0 ? [str] : [];
    }
    return [];
};