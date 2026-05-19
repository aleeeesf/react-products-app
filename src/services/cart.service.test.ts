import { beforeEach, describe, expect, it, vi } from 'vitest';
import { addProductToCart } from './cart.service';

const postAddToCart = vi.hoisted(() =>
  vi.fn<() => Promise<{ count: number }>>()
);

vi.mock('@/api', () => ({
  postAddToCart,
}));

describe('cart.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('lanza error si el id es inválido', async () => {
    await expect(
      addProductToCart({ id: '', colorCode: 1, storageCode: 1 })
    ).rejects.toBeInstanceOf(Error);

    expect(postAddToCart).not.toHaveBeenCalled();
  });

  it('llama a la API con el payload correcto', async () => {
    const payload = { id: '1', colorCode: 1, storageCode: 2 };
    postAddToCart.mockResolvedValueOnce({ count: 2 });

    const result = await addProductToCart(payload);

    expect(result).toEqual({ count: 2 });
    expect(postAddToCart).toHaveBeenCalledTimes(1);
    expect(postAddToCart).toHaveBeenCalledWith(payload);
  });

  it('lanza error si la respuesta de la API es inválida', async () => {
    postAddToCart.mockResolvedValueOnce({ count: 'invalid' } as never);

    await expect(
      addProductToCart({ id: '1', colorCode: 1, storageCode: 2 })
    ).rejects.toBeInstanceOf(Error);
  });

  it('propaga error si la API falla', async () => {
    postAddToCart.mockRejectedValueOnce(new Error('network error'));

    await expect(
      addProductToCart({ id: '1', colorCode: 1, storageCode: 2 })
    ).rejects.toBeInstanceOf(Error);
  });
});