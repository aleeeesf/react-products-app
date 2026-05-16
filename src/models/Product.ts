// ============= API RESPONSE TYPES =============

export interface ApiProductResponse {
    id?: unknown;
    brand?: unknown;
    model?: unknown;
    price?: unknown;
    imgUrl?: unknown;
    [key: string]: unknown;
}

export interface ApiColorOption {
    code?: unknown;
    name?: unknown;
}

export interface ApiStorageOption {
    code?: unknown;
    name?: unknown;
}

export interface ApiProductOptions {
    colors?: ApiColorOption[];
    storages?: ApiStorageOption[];
}

export interface ApiProductDetailResponse extends ApiProductResponse {
    networkTechnology?: unknown;
    networkSpeed?: unknown;
    gprs?: unknown;
    edge?: unknown;
    announced?: unknown;
    status?: unknown;
    dimentions?: unknown;
    weight?: unknown;
    sim?: unknown;
    displayType?: unknown;
    displayResolution?: unknown;
    displaySize?: unknown;
    os?: unknown;
    cpu?: unknown;
    chipset?: unknown;
    gpu?: unknown;
    externalMemory?: unknown;
    internalMemory?: unknown;
    ram?: unknown;
    primaryCamera?: unknown;
    secondaryCmera?: unknown;
    speaker?: unknown;
    audioJack?: unknown;
    wlan?: unknown;
    bluetooth?: unknown;
    gps?: unknown;
    nfc?: unknown;
    radio?: unknown;
    usb?: unknown;
    sensors?: unknown;
    battery?: unknown;
    colors?: unknown;
    options?: ApiProductOptions;
}

// ============= APP TYPES =============

export interface IProduct {
    id: string;
    brand: string;
    model: string;
    price: string;
    imgUrl: string;
}

export class Product {
    id: string;
    brand: string;
    model: string;
    price: string;
    imgUrl: string;

    constructor(data: Partial<IProduct> = {}) {
        this.id = data.id ?? '';
        this.brand = data.brand ?? 'Desconocida';
        this.model = data.model ?? 'Desconocido';
        this.price = data.price ?? 'No disponible';
        this.imgUrl = data.imgUrl ?? '';
    }
}

export interface IProductOptions {
    colors: Array<{ code: number; name: string }>;
    storages: Array<{ code: number; name: string }>;
}

export class ProductOptions {
    colors: Array<{ code: number; name: string }>;
    storages: Array<{ code: number; name: string }>;

    constructor(data: Partial<IProductOptions> = {}) {
        this.colors = data.colors ?? [];
        this.storages = data.storages ?? [];
    }
}

export interface IProductDetail extends IProduct {
    networkTechnology: string;
    networkSpeed: string;
    gprs: string;
    edge: string;
    announced: string;
    status: string;
    dimentions: string;
    weight: string;
    sim: string;
    displayType: string;
    displayResolution: string;
    displaySize: string;
    os: string;
    cpu: string;
    chipset: string;
    gpu: string;
    externalMemory: string;
    internalMemory: string[];
    ram: string;
    primaryCamera: string[];
    secondaryCamera: string[];
    speaker: string;
    audioJack: string;
    wlan: string[];
    bluetooth: string[];
    gps: string;
    nfc: string;
    radio: string;
    usb: string;
    sensors: string[];
    battery: string;
    colors: string[];
    options: ProductOptions;
}

export class ProductDetail {
    id: string;
    brand: string;
    model: string;
    price: string;
    imgUrl: string;
    networkTechnology: string;
    networkSpeed: string;
    gprs: string;
    edge: string;
    announced: string;
    status: string;
    dimentions: string;
    weight: string;
    sim: string;
    displayType: string;
    displayResolution: string;
    displaySize: string;
    os: string;
    cpu: string;
    chipset: string;
    gpu: string;
    externalMemory: string;
    internalMemory: string[];
    ram: string;
    primaryCamera: string[];
    secondaryCamera: string[];
    speaker: string;
    audioJack: string;
    wlan: string[];
    bluetooth: string[];
    gps: string;
    nfc: string;
    radio: string;
    usb: string;
    sensors: string[];
    battery: string;
    colors: string[];
    options: ProductOptions;

    constructor(data: Partial<IProductDetail> = {}) {
        this.id = data.id ?? '';
        this.brand = data.brand ?? 'Desconocida';
        this.model = data.model ?? 'Desconocido';
        this.price = data.price ?? 'No disponible';
        this.imgUrl = data.imgUrl ?? '';
        this.networkTechnology = data.networkTechnology ?? '';
        this.networkSpeed = data.networkSpeed ?? '';
        this.gprs = data.gprs ?? '';
        this.edge = data.edge ?? '';
        this.announced = data.announced ?? '';
        this.status = data.status ?? '';
        this.dimentions = data.dimentions ?? '';
        this.weight = data.weight ?? '';
        this.sim = data.sim ?? '';
        this.displayType = data.displayType ?? '';
        this.displayResolution = data.displayResolution ?? '';
        this.displaySize = data.displaySize ?? '';
        this.os = data.os ?? '';
        this.cpu = data.cpu ?? '';
        this.chipset = data.chipset ?? '';
        this.gpu = data.gpu ?? '';
        this.externalMemory = data.externalMemory ?? '';
        this.internalMemory = data.internalMemory ?? [];
        this.ram = data.ram ?? '';
        this.primaryCamera = data.primaryCamera ?? [];
        this.secondaryCamera = data.secondaryCamera ?? [];
        this.speaker = data.speaker ?? '';
        this.audioJack = data.audioJack ?? '';
        this.wlan = data.wlan ?? [];
        this.bluetooth = data.bluetooth ?? [];
        this.gps = data.gps ?? '';
        this.nfc = data.nfc ?? '';
        this.radio = data.radio ?? '';
        this.usb = data.usb ?? '';
        this.sensors = data.sensors ?? [];
        this.battery = data.battery ?? '';
        this.colors = data.colors ?? [];
        this.options = new ProductOptions(data.options);
    }
}

export interface IColorOption {
    code: number;
    name: string;
}

export class ColorOption {
    code: number;
    name: string;

    constructor(data: Partial<IColorOption> = {}) {
        this.code = data.code ?? 0;
        this.name = data.name ?? 'Desconocido';
    }
}

export interface IStorageOption {
    code: number;
    name: string;
}

export class StorageOption {
    code: number;
    name: string;

    constructor(data: Partial<IStorageOption> = {}) {
        this.code = data.code ?? 0;
        this.name = data.name ?? 'Desconocido';
    }
}