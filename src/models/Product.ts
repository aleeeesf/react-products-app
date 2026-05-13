//Producto base con información mínima requerida
export interface Product {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
}

/**
 * Detalle completo del producto con todas las especificaciones
 * Las propiedades opcionales representan campos que pueden no estar disponibles en la API
 */
export interface ProductDetail extends Product {
  // Network
  networkTechnology?: string;
  networkSpeed?: string;
  gprs?: string;
  edge?: string;

  // Estado y fechas
  announced?: string;
  status?: string;

  // Físicas
  dimentions?: string;
  weight?: string;
  sim?: string;

  // Display
  displayType?: string;
  displayResolution?: string;
  displaySize?: string;

  // Procesador y memoria
  os?: string;
  cpu?: string;
  chipset?: string;
  gpu?: string;
  externalMemory?: string;
  internalMemory?: string[];
  ram?: string;

  // Cámaras
  primaryCamera?: string[];
  secondaryCamera?: string[];

  // Audio
  speaker?: string;
  audioJack?: string;

  // Conectividad
  wlan?: string[];
  bluetooth?: string[];
  gps?: string;
  nfc?: string;
  radio?: string;
  usb?: string;

  // Sensores y batería
  sensors?: string[];
  battery?: string;

  // Disponibilidad (legacy)
  colors?: string[];

  // Opciones de compra
  options?: ProductOptions;
}

// Opciones de colores y almacenamientos disponibles para un producto
export interface ProductOptions {
  colors?: Array<{ code: number; name: string }>;
  storages?: Array<{ code: number; name: string }>;
}