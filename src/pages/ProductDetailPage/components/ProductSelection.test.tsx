import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ProductSelection } from './ProductSelection';
import { makeProductDetail } from '@/test/factories';

function buildSelectableProduct() {
  return makeProductDetail({
    id: 'p1',
    options: {
      colors: [
        { code: 1, name: 'Black' },
        { code: 2, name: 'Blue' },
      ],
      storages: [
        { code: 10, name: '128 GB' },
        { code: 20, name: '256 GB' },
      ],
    },
  });
}

describe('ProductSelection', () => {
  it('envía el payload con valores por defecto', async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    render(
      <ProductSelection
        product={buildSelectableProduct()}
        onAddToCart={onAddToCart}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Añadir al Carrito' }));

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith({
      id: 'p1',
      colorCode: 1,
      storageCode: 10,
    });
  });

  it('actualiza la selección antes de añadir al carrito', async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    render(
      <ProductSelection
        product={buildSelectableProduct()}
        onAddToCart={onAddToCart}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Blue' }));
    await user.click(screen.getByRole('button', { name: '256 GB' }));
    await user.click(screen.getByRole('button', { name: 'Añadir al Carrito' }));

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith({
      id: 'p1',
      colorCode: 2,
      storageCode: 20,
    });
  });

  it('no permite añadir al carrito si no hay opciones disponibles', async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    const productWithoutOptions = makeProductDetail({
      id: 'p1',
      options: {
        colors: [],
        storages: [],
      },
    });

    render(
      <ProductSelection
        product={productWithoutOptions}
        onAddToCart={onAddToCart}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Añadir al Carrito' }));

    expect(onAddToCart).not.toHaveBeenCalled();
  });
});