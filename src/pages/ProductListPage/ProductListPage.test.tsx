import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductListPage from './ProductListPage';

import { useProductsList, useDebounce } from '@/hooks';
import { makeProduct } from '@/test/factories';

vi.mock('react-router-dom', () => ({
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
}));

vi.mock('@/hooks', () => ({
  useProductsList: vi.fn(),
  useDebounce: vi.fn(),
}));

describe('ProductListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Para que el debounce devuelva el valor instantáneamente
    vi.mocked(useDebounce).mockImplementation((value) => value);
  });

  it('muestra loading mientras carga productos', () => {
    vi.mocked(useProductsList).mockReturnValue({
      loading: true,
      error: null,
      products: [],
    });

    render(<ProductListPage />);

    expect(
      screen.getByText(/cargando productos/i)
    ).toBeInTheDocument();
  });

  it('muestra estado de error', () => {
    vi.mocked(useProductsList).mockReturnValue({
      loading: false,
      error: 'Error inesperado',
      products: [],
    });

    render(<ProductListPage />);

    expect(
      screen.getByText(/error al cargar los productos/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/error inesperado/i)
    ).toBeInTheDocument();
  });

  it('renderiza correctamente la lista de productos', () => {
    vi.mocked(useProductsList).mockReturnValue({
      loading: false,
      error: null,
      products: [
        makeProduct({
          id: '1',
          brand: 'Apple',
          model: 'iPhone',
        }),
        makeProduct({
          id: '2',
          brand: 'Samsung',
          model: 'Galaxy',
        }),
      ],
    });

    render(<ProductListPage />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Samsung')).toBeInTheDocument();
    expect(screen.getByText('iPhone')).toBeInTheDocument();
    expect(screen.getByText('Galaxy')).toBeInTheDocument();
  });

  it('filtra productos por búsqueda', () => {
    vi.mocked(useProductsList).mockReturnValue({
      loading: false,
      error: null,
      products: [
        makeProduct({
          id: '1',
          brand: 'Apple',
          model: 'iPhone',
        }),
        makeProduct({
          id: '2',
          brand: 'Samsung',
          model: 'Galaxy',
        }),
      ],
    });

    render(<ProductListPage />);

    const input = screen.getByLabelText(/buscar productos/i);

    fireEvent.change(input, {
      target: { value: 'apple' },
    });

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('Samsung')).not.toBeInTheDocument();
  });

  it('muestra mensaje si no hay productos disponibles', () => {
    vi.mocked(useProductsList).mockReturnValue({
      loading: false,
      error: null,
      products: [],
    });

    render(<ProductListPage />);

    expect(
      screen.getByText(/no hay productos disponibles/i)
    ).toBeInTheDocument();
  });

  it('muestra mensaje si en la búsqueda no encuentra resultados', () => {
    vi.mocked(useProductsList).mockReturnValue({
      loading: false,
      error: null,
      products: [
        makeProduct({
          id: '1',
          brand: 'Apple',
          model: 'iPhone',
        }),
      ],
    });

    render(<ProductListPage />);

    const input = screen.getByLabelText(/buscar productos/i);

    fireEvent.change(input, {
      target: { value: 'nokia' },
    });

    expect(
      screen.getByText(/no se encontraron productos/i)
    ).toBeInTheDocument();
  });

  it('genera links correctos a detalle de producto', () => {
    vi.mocked(useProductsList).mockReturnValue({
      loading: false,
      error: null,
      products: [
        makeProduct({
          id: '123',
          brand: 'Apple',
          model: 'iPhone',
        }),
      ],
    });

    render(<ProductListPage />);

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', '/product/123');
  });
});