import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useProductsList } from './useProductsList';
import { makeProduct } from '@/test/factories';

const { getProducts } = vi.hoisted(() => ({
  getProducts: vi.fn(),
}));

vi.mock('@/services', () => ({
  getProducts,
}));

describe('useProductsList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('inicializa con estado de carga', () => {
    getProducts.mockResolvedValue([]);

    const { result } = renderHook(() => useProductsList());

    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('carga productos correctamente', async () => {
    const mockProducts = [
      makeProduct({ id: '1', brand: 'Apple' }),
      makeProduct({ id: '2', brand: 'Samsung' }),
    ];

    getProducts.mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(() => useProductsList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(getProducts).toHaveBeenCalledTimes(1);
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
  });

  it('maneja errores correctamente cuando falla la petición', async () => {
    getProducts.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useProductsList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(getProducts).toHaveBeenCalledTimes(1);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe('Error inesperado al cargar los productos');
  });

  it('no actualiza estado tras desmontarse', async () => {
    let resolvePromise: (value: ReturnType<typeof makeProduct>[]) => void;

    const pendingPromise = new Promise<ReturnType<typeof makeProduct>[]>((resolve) => {
      resolvePromise = resolve;
    });

    getProducts.mockReturnValueOnce(pendingPromise);

    const { result, unmount } = renderHook(() => useProductsList());

    expect(result.current.loading).toBe(true);

    unmount();

    resolvePromise!([makeProduct({ id: '1' })]);

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });
  });
});