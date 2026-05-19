import type { Product, ProductDetail } from '@/models';

const defaultProduct: Product = {
  id: 'test-id',
  brand: 'Apple',
  model: 'iPhone',
  price: '999',
  imgUrl: '',
};

export const makeProduct = (
  overrides: Partial<Product> = {}
): Product => ({
  ...defaultProduct,
  ...overrides,
});

/**
 * =========================
 * PRODUCT DETAIL FACTORY
 * =========================
 */

const defaultProductDetail: ProductDetail = {
  id: 'test-id',
  brand: 'Apple',
  model: 'iPhone',
  price: '999',
  imgUrl: '',

  networkTechnology: '',
  networkSpeed: '',
  gprs: '',
  edge: '',
  announced: '',
  status: '',
  dimentions: '',
  weight: '',
  sim: '',
  displayType: '',
  displayResolution: '',
  displaySize: '',
  os: '',
  cpu: '',
  chipset: '',
  gpu: '',
  externalMemory: '',
  internalMemory: [],
  ram: '',
  primaryCamera: [],
  secondaryCamera: [],
  speaker: '',
  audioJack: '',
  wlan: [],
  bluetooth: [],
  gps: '',
  nfc: '',
  radio: '',
  usb: '',
  sensors: [],
  battery: '',
  colors: [],

  options: {
    colors: [],
    storages: [],
  },
};

export const makeProductDetail = (
  overrides: Partial<ProductDetail> = {}
): ProductDetail => ({
  ...defaultProductDetail,
  ...overrides,
});