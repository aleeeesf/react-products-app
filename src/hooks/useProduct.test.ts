import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useProduct } from './useProduct';
import { makeProductDetail } from '@/test/factories';

const { getProductDetail } = vi.hoisted(() => ({
  getProductDetail: vi.fn(),
}));

vi.mock('@/services', () => ({
  getProductDetail,
}));

describe('useProduct', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('está inactivo cuando productId está vacío', () => {
    const { result } = renderHook(() => useProduct(''));

    expect(result.current.loading).toBe(false);
    expect(result.current.product).toBeUndefined();
    expect(result.current.error).toBeNull();

    expect(getProductDetail).not.toHaveBeenCalled();
  });

  it('está inactivo cuando productId es undefined', () => {
    const { result } = renderHook(() => useProduct());

    expect(result.current.loading).toBe(false);
    expect(result.current.product).toBeUndefined();
    expect(result.current.error).toBeNull();

    expect(getProductDetail).not.toHaveBeenCalled();
  });

  it('carga el producto correctamente', async () => {
    const mockProduct = makeProductDetail({
      id: '1',
      brand: 'Apple',
      model: 'iPhone',
    });

    getProductDetail.mockResolvedValueOnce(mockProduct);

    const { result } = renderHook(() => useProduct('1'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(getProductDetail).toHaveBeenCalledTimes(1);
    expect(getProductDetail).toHaveBeenCalledWith('1');

    expect(result.current.product).toEqual(mockProduct);
    expect(result.current.error).toBeNull();
  });

  it('establece error cuando la petición falla', async () => {
    getProductDetail.mockRejectedValueOnce(new Error('network error'));

    const { result } = renderHook(() => useProduct('1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(getProductDetail).toHaveBeenCalledTimes(1);
    expect(result.current.product).toBeUndefined();
    expect(result.current.error).toBe(
      'Error inesperado al cargar el producto'
    );
  });

  it('recarga datos cuando se cambia de productId', async () => {
    const firstProduct = makeProductDetail({ id: '1', brand: 'Apple' });
    const secondProduct = makeProductDetail({ id: '2', brand: 'Samsung' });

    getProductDetail
      .mockResolvedValueOnce(firstProduct)
      .mockResolvedValueOnce(secondProduct);

    const { result, rerender } = renderHook(
      ({ productId }) => useProduct(productId),
      {
        initialProps: { productId: '1' },
      }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.product?.id).toBe('1');

    rerender({ productId: '2' });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(getProductDetail).toHaveBeenCalledTimes(2);
    expect(getProductDetail).toHaveBeenNthCalledWith(1, '1');
    expect(getProductDetail).toHaveBeenNthCalledWith(2, '2');

    expect(result.current.product?.id).toBe('2');
    expect(result.current.product?.brand).toBe('Samsung');
  });

  it('no actualiza estado tras desmontarse', async () => {
    let resolvePromise!: (value: ReturnType<typeof makeProductDetail>) => void;

    const pendingPromise = new Promise<ReturnType<typeof makeProductDetail>>(
      (resolve) => {
        resolvePromise = resolve;
      }
    );

    getProductDetail.mockReturnValueOnce(pendingPromise);

    const { result, unmount } = renderHook(() => useProduct('1'));

    expect(result.current.loading).toBe(true);

    unmount();

    resolvePromise(makeProductDetail({ id: '1' }));

    await waitFor(() => {
      expect(getProductDetail).toHaveBeenCalledTimes(1);
    });
  });
});