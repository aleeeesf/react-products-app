import { type ProductsList, type ProductDetail} from '@/models';

export function adaptListProducts(apiResponse: any): ProductsList {
    return {
        products: apiResponse.map((product: any) => ({
            id: product.id,
            brand: product.brand,
            model: product.model,
            price: product.price,
            imgUrl: product.imgUrl
        }))
    };
}

export function adaptProductDetail(apiResponse: any): ProductDetail {
    return {
        id: apiResponse.id,
        brand: apiResponse.brand,
        model: apiResponse.model,
        price: apiResponse.price,
        imgUrl: apiResponse.imgUrl,
        networkTechnology: apiResponse.networkTechnology,
        networkSpeed: apiResponse.networkSpeed,
        gprs: apiResponse.gprs,
        edge: apiResponse.edge,
        announced: apiResponse.announced,
        status: apiResponse.status,
        dimentions: apiResponse.dimentions,
        weight: apiResponse.weight,
        sim: apiResponse.sim,
        displayType: apiResponse.displayType,
        displayResolution: apiResponse.displayResolution,
        displaySize: apiResponse.displaySize,
        os: apiResponse.os,
        cpu: apiResponse.cpu,
        chipset: apiResponse.chipset,
        gpu: apiResponse.gpu,
        externalMemory: apiResponse.externalMemory,
        internalMemory: apiResponse.internalMemory,
        ram: apiResponse.ram,
        primaryCamera: apiResponse.primaryCamera,
        secondaryCamera: apiResponse.secondaryCmera, // ! API devuelve "secondaryCmera" sin la a de "camera", nuestro modelo sí la tiene
        speaker: apiResponse.speaker,
        audioJack: apiResponse.audioJack,
        wlan: apiResponse.wlan,
        bluetooth: apiResponse.bluetooth,
        gps: apiResponse.gps,
        nfc: apiResponse.nfc,
        radio: apiResponse.radio,
        usb: apiResponse.usb,
        sensors: apiResponse.sensors,
        battery: apiResponse.battery,
        colors: apiResponse.colors,
        options: {
            colors: apiResponse.options.colors,
            storages: apiResponse.options.storages
        }
    };
}