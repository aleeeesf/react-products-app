import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductDetailPage from './ProductDetailPage';

import { useProduct, useCart } from '@/hooks';

vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
  Link: ({ children }: any) => <a>{children}</a>,
}));

vi.mock('@/hooks', () => ({
  useProduct: vi.fn(),
  useCart: vi.fn(),
}));

const mockAddToCart = vi.fn();

describe('ProductDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useCart).mockReturnValue({
      cartCount: 0,
      addToCart: mockAddToCart,
    });
  });

  it('muestra loading', () => {
    vi.mocked(useProduct).mockReturnValue({
      product: undefined,
      loading: true,
      error: null,
    });

    render(<ProductDetailPage />);

    expect(
      screen.getByText(/cargando detalles del producto/i)
    ).toBeInTheDocument();
  });

  it('muestra error', () => {
    vi.mocked(useProduct).mockReturnValue({
      product: undefined,
      loading: false,
      error: 'Error inesperado',
    });

    render(<ProductDetailPage />);

    expect(
      screen.getByText(/error al cargar el producto/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/error inesperado/i)
    ).toBeInTheDocument();
  });

  it('muestra not found si no hay producto', () => {
    vi.mocked(useProduct).mockReturnValue({
      product: undefined,
      loading: false,
      error: null,
    });

    render(<ProductDetailPage />);

    expect(
      screen.getByText(/producto no encontrado/i)
    ).toBeInTheDocument();
  });

  it('renderiza el producto correctamente', () => {
    vi.mocked(useProduct).mockReturnValue({
      product: {
        id: '1',
        brand: 'Apple',
        model: 'iPhone',
        price: '999',
        imgUrl: '',
        options: {
          colors: [{ code: 1, name: 'Black' }],
          storages: [{ code: 10, name: '128GB' }],
        },
      } as any,
      loading: false,
      error: null,
    });

    render(<ProductDetailPage />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('llama a addToCart cuando se añade al carrito', () => {
    vi.mocked(useProduct).mockReturnValue({
      product: {
        id: '1',
        brand: 'Apple',
        model: 'iPhone',
        price: '999',
        imgUrl: '',
        options: {
          colors: [{ code: 1, name: 'Black' }],
          storages: [{ code: 10, name: '128GB' }],
        },
      } as any,
      loading: false,
      error: null,
    });

    render(<ProductDetailPage />);

    const button = screen.getByRole('button', {
      name: /añadir al carrito/i,
    });

    fireEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalledWith({
      id: '1',
      colorCode: 1,
      storageCode: 10,
    });
  });

  it('puede abrir/cerrar more specs', () => {
    vi.mocked(useProduct).mockReturnValue({
      product: {
        id: '1',
        brand: 'Apple',
        model: 'iPhone',
        price: '999',
        imgUrl: '',
        options: {
          colors: [],
          storages: [],
        },
      } as any,
      loading: false,
      error: null,
    });

    render(<ProductDetailPage />);

    const toggle = screen.getByRole('button', {
      name: /más especificaciones técnicas/i,
    });

    fireEvent.click(toggle);

    expect(toggle).toBeInTheDocument();
  });
});