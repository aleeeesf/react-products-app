import { renderHook, waitFor, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCart } from './useCart';
import { CartProvider } from '@/contexts';
import type { AddToCartRequest } from '@/models';

const { addProductToCart } = vi.hoisted(() => ({
  addProductToCart: vi.fn(),
}));

const { getCachedData, setCachedData } = vi.hoisted(() => ({
  getCachedData: vi.fn(),
  setCachedData: vi.fn(),
}));

vi.mock('@/services', () => ({
  addProductToCart,
}));

vi.mock('@/utils/cache.utils', () => ({
  getCachedData,
  setCachedData,
}));

describe('useCart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  const validPayload: AddToCartRequest = {
    id: 'p1',
    colorCode: 1,
    storageCode: 10,
  };

  it('lanza error si se usa fuera de CartProvider', () => {
    expect(() => renderHook(() => useCart())).toThrow(
      'useCart debe usarse dentro de CartProvider'
    );
  });

  it('inicializa cartCount desde caché', () => {
    getCachedData.mockReturnValueOnce(3);

    const { result } = renderHook(() => useCart(), {
      wrapper,
    });

    expect(result.current.cartCount).toBe(3);
    expect(getCachedData).toHaveBeenCalledWith('cart_count');
  });

  it('usa 0 si no hay caché', () => {
    getCachedData.mockReturnValueOnce(null);

    const { result } = renderHook(() => useCart(), {
      wrapper,
    });

    expect(result.current.cartCount).toBe(0);
  });

  it('incrementa cartCount al añadir producto correctamente', async () => {
    getCachedData.mockReturnValueOnce(0);
    addProductToCart.mockResolvedValueOnce({ count: 1 });

    const { result } = renderHook(() => useCart(), {
      wrapper,
    });

    await act(async () => {
      await result.current.addToCart(validPayload);
    });

    expect(addProductToCart).toHaveBeenCalledTimes(1);
    expect(addProductToCart).toHaveBeenCalledWith(validPayload);
    expect(result.current.cartCount).toBe(1);
  });

  it('persiste cambios en caché cuando cambia cartCount', async () => {
    getCachedData.mockReturnValueOnce(0);
    addProductToCart.mockResolvedValueOnce({ count: 1 });

    const { result } = renderHook(() => useCart(), {
      wrapper,
    });

    await act(async () => {
      await result.current.addToCart(validPayload);
    });

    await waitFor(() => {
      expect(setCachedData).toHaveBeenCalledWith('cart_count', 1);
    });
  });

  it('no incrementa cartCount si addProductToCart falla', async () => {
    getCachedData.mockReturnValueOnce(2);
    addProductToCart.mockRejectedValueOnce(new Error('network error'));

    const { result } = renderHook(() => useCart(), {
      wrapper,
    });

    await act(async () => {
      await result.current.addToCart(validPayload);
    });

    expect(result.current.cartCount).toBe(2);
    expect(addProductToCart).toHaveBeenCalledTimes(1);
  });

  it('mantiene referencia estable de addToCart entre renders', async () => {
    getCachedData.mockReturnValueOnce(0);

    const { result, rerender } = renderHook(() => useCart(), {
      wrapper,
    });

    const firstAddToCart = result.current.addToCart;

    rerender();

    expect(result.current.addToCart).toBe(firstAddToCart);
  });

  it('actualiza cartCount múltiples veces correctamente', async () => {
    getCachedData.mockReturnValueOnce(0);
    addProductToCart
      .mockResolvedValueOnce({ count: 1 })
      .mockResolvedValueOnce({ count: 2 });

    const { result } = renderHook(() => useCart(), {
      wrapper,
    });

    await act(async () => {
      await result.current.addToCart(validPayload);
      await result.current.addToCart(validPayload);
    });

    expect(result.current.cartCount).toBe(2);
  });
});