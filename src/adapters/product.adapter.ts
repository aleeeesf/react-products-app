import {
    type ApiProductDetailResponse,
    type ApiProductResponse,
    Product,
    ProductDetail,
    ColorOption,
    StorageOption
} from '@/models';

function toString(value: unknown): string {
    return String(value ?? '').trim();
}

function toStringArray(value: unknown): string[] {
    if (Array.isArray(value)) {
        return value.map(v => toString(v)).filter(Boolean);
    }
    return [];
}

export function adaptListProducts(apiResponse: unknown): Product[] {
    if (!Array.isArray(apiResponse)) {
        throw new Error('Se esperaba un array de productos de la API');
    }

    return apiResponse.map((item: unknown, index: number) => {
        if (!item || typeof item !== 'object') {
            throw new Error(`Producto en el índice ${index} no es un objeto válido`);
        }

        const product = item as ApiProductResponse;

        if (!product.id) {
            throw new Error(`Producto en el índice ${index} no tiene la propiedad "id"`);
        }

        return new Product({
            id: toString(product.id),
            brand: toString(product.brand),
            model: toString(product.model),
            price: toString(product.price),
            imgUrl: toString(product.imgUrl)
        });
    });
}

export function adaptProductDetail(apiResponse: unknown): ProductDetail {
    if (!apiResponse || typeof apiResponse !== 'object' || Array.isArray(apiResponse)) {
        throw new Error('Se esperaba un objeto de detalle de producto del API');
    }

    const data = apiResponse as ApiProductDetailResponse;

    if (!data.id) {
        throw new Error('El producto no tiene la propiedad "id"');
    }

    return new ProductDetail({
        id: toString(data.id),
        brand: toString(data.brand),
        model: toString(data.model),
        price: toString(data.price),
        imgUrl: toString(data.imgUrl),
        networkTechnology: toString(data.networkTechnology),
        networkSpeed: toString(data.networkSpeed),
        gprs: toString(data.gprs),
        edge: toString(data.edge),
        announced: toString(data.announced),
        status: toString(data.status),
        dimentions: toString(data.dimentions),
        weight: toString(data.weight),
        sim: toString(data.sim),
        displayType: toString(data.displayType),
        displayResolution: toString(data.displayResolution),
        displaySize: toString(data.displaySize),
        os: toString(data.os),
        cpu: toString(data.cpu),
        chipset: toString(data.chipset),
        gpu: toString(data.gpu),
        externalMemory: toString(data.externalMemory),
        internalMemory: toStringArray(data.internalMemory),
        ram: toString(data.ram),
        primaryCamera: toStringArray(data.primaryCamera),
        secondaryCamera: toStringArray(data.secondaryCmera),
        speaker: toString(data.speaker),
        audioJack: toString(data.audioJack),
        wlan: toStringArray(data.wlan),
        bluetooth: toStringArray(data.bluetooth),
        gps: toString(data.gps),
        nfc: toString(data.nfc),
        radio: toString(data.radio),
        usb: toString(data.usb),
        sensors: toStringArray(data.sensors),
        battery: toString(data.battery),
        colors: toStringArray(data.colors),
        options: {
            colors: (data.options?.colors ?? []).map(c => new ColorOption({
                code: Number(c?.code ?? 0),
                name: toString(c?.name)
            })),
            storages: (data.options?.storages ?? []).map(s => new StorageOption({
                code: Number(s?.code ?? 0),
                name: toString(s?.name)
            }))
        }
    });
}