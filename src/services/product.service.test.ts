import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getProductDetail, getProducts } from './product.service';
import type { ApiProductDetailResponse, ApiProductResponse } from '@/models';
import { makeProduct, makeProductDetail } from '@/test/factories';

const { getCachedData, setCachedData } = vi.hoisted(() => ({
  getCachedData: vi.fn(),
  setCachedData: vi.fn(),
}));

const { fetchListProducts, fetchProductDetail } = vi.hoisted(() => ({
  fetchListProducts: vi.fn(),
  fetchProductDetail: vi.fn(),
}));

const { adaptListProducts, adaptProductDetail } = vi.hoisted(() => ({
  adaptListProducts: vi.fn(),
  adaptProductDetail: vi.fn(),
}));

vi.mock('@/utils', () => ({ getCachedData, setCachedData }));
vi.mock('@/api', () => ({ fetchListProducts, fetchProductDetail }));
vi.mock('@/adapters', () => ({ adaptListProducts, adaptProductDetail }));

describe('product.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getProducts devuelve de la caché si existe', async () => {
    const cached = [makeProduct({ id: 'cached' })];

    getCachedData.mockReturnValueOnce(cached);

    const result = await getProducts();

    expect(result).toEqual(cached);
    expect(fetchListProducts).not.toHaveBeenCalled();
  });

  it('getProducts fetch + adapt + cache', async () => {
    const apiData: ApiProductResponse[] = [{ id: '1' }];
    const adapted = [makeProduct({ id: '1' })];

    getCachedData.mockReturnValueOnce(null);
    fetchListProducts.mockResolvedValueOnce(apiData);
    adaptListProducts.mockReturnValueOnce(adapted);

    const result = await getProducts();

    expect(result).toEqual(adapted);
    expect(fetchListProducts).toHaveBeenCalledTimes(1);
    expect(adaptListProducts).toHaveBeenCalledWith(apiData);
    expect(setCachedData).toHaveBeenCalledWith('products', adapted);
  });

  it('getProductDetail lanza error si el id está vacío', async () => {
    await expect(getProductDetail('')).rejects.toBeInstanceOf(Error);

    expect(fetchProductDetail).not.toHaveBeenCalled();
    expect(adaptProductDetail).not.toHaveBeenCalled();
    expect(getCachedData).not.toHaveBeenCalled();
    expect(setCachedData).not.toHaveBeenCalled();
  });

  it('getProductDetail devuelve de la caché si existe', async () => {
    const cached = makeProductDetail({ id: 'p1' });

    getCachedData.mockReturnValueOnce(cached);

    const result = await getProductDetail('p1');

    expect(result).toEqual(cached);
    expect(fetchProductDetail).not.toHaveBeenCalled();
  });

  it('getProductDetail fetch + adapt + cache', async () => {
    const apiData: ApiProductDetailResponse = { id: 'p2' };
    const adapted = makeProductDetail({ id: 'p2' });

    getCachedData.mockReturnValueOnce(null);
    fetchProductDetail.mockResolvedValueOnce(apiData);
    adaptProductDetail.mockReturnValueOnce(adapted);

    const result = await getProductDetail('p2');

    expect(result).toEqual(adapted);
    expect(fetchProductDetail).toHaveBeenCalledTimes(1);
    expect(adaptProductDetail).toHaveBeenCalledWith(apiData);
    expect(setCachedData).toHaveBeenCalledWith('product_p2', adapted);
  });
});