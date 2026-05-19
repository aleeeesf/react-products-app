import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ProductActions } from './ProductActions';
import { makeProductDetail } from '@/test/factories';

describe('ProductActions', () => {
  it('habilita el botón cuando puede añadirse al carrito y el precio es válido', async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    render(
      <ProductActions
        product={makeProductDetail({ price: '999' })}
        canAddToCart={true}
        onAddToCart={onAddToCart}
      />
    );

    const button = screen.getByRole('button', { name: /añadir al carrito/i });

    expect(button).toBeEnabled();
    expect(button).toHaveAttribute('title', 'Añadir producto al carrito');

    await user.click(button);

    expect(onAddToCart).toHaveBeenCalledTimes(1);
  });

  it('deshabilita el botón cuando no puede añadirse al carrito', () => {
    const onAddToCart = vi.fn();

    render(
      <ProductActions
        product={makeProductDetail({ price: '999' })}
        canAddToCart={false}
        onAddToCart={onAddToCart}
      />
    );

    const button = screen.getByRole('button', { name: /añadir al carrito/i });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('title', 'Selecciona color y almacenamiento');
  });

  it('deshabilita el botón cuando el precio no es válido', () => {
    const onAddToCart = vi.fn();

    render(
      <ProductActions
        product={makeProductDetail({ price: 'No disponible' })}
        canAddToCart={true}
        onAddToCart={onAddToCart}
      />
    );

    const button = screen.getByRole('button', { name: /no disponible/i });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('title', 'Precio no disponible para la venta');
  });

  it('deshabilita el botón cuando el precio es 0', () => {
    const onAddToCart = vi.fn();

    render(
      <ProductActions
        product={makeProductDetail({ price: '0' })}
        canAddToCart={true}
        onAddToCart={onAddToCart}
      />
    );

    const button = screen.getByRole('button', { name: /no disponible/i });

    expect(button).toBeDisabled();
  });

  it('deshabilita el botón cuando el precio está vacío', () => {
    const onAddToCart = vi.fn();

    render(
      <ProductActions
        product={makeProductDetail({ price: '' })}
        canAddToCart={true}
        onAddToCart={onAddToCart}
      />
    );

    const button = screen.getByRole('button', { name: /no disponible/i });

    expect(button).toBeDisabled();
  });

  it('no ejecuta callback si el botón está deshabilitado', async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    render(
      <ProductActions
        product={makeProductDetail({ price: 'No disponible' })}
        canAddToCart={true}
        onAddToCart={onAddToCart}
      />
    );

    const button = screen.getByRole('button', { name: /no disponible/i });

    expect(button).toBeDisabled();

    await user.click(button);

    expect(onAddToCart).not.toHaveBeenCalled();
  });
});