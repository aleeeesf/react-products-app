import { describe, it, expect } from 'vitest';
import { adaptListProducts, adaptProductDetail } from '@/adapters';

import { Product, ProductDetail } from '@/models';

describe('adapters', () => {

  describe('adaptListProducts', () => {
    it('convierte correctamente un array de productos válidos', () => {
      const input = [
        {
          id: 1,
          brand: 'Apple',
          model: 'iPhone',
          price: 999,
          imgUrl: 'img.png',
        },
      ];

      const result = adaptListProducts(input);

      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Product);
      expect(result[0].id).toBe('1');
      expect(result[0].brand).toBe('Apple');
      expect(result[0].price).toBe('999');
    });

    it('convierte valores undefined/null a strings vacíos', () => {
      const input = [
        {
          id: 1,
          brand: null,
          model: undefined,
          price: 0,
          imgUrl: null,
        },
      ];

      const result = adaptListProducts(input);

      expect(result[0].brand).toBe('');
      expect(result[0].model).toBe('');
      expect(result[0].price).toBe('0');
    });

    it('lanza error si no es un array', () => {
      expect(() => adaptListProducts({})).toThrow(
        'Se esperaba un array de productos de la API'
      );
    });

    it('lanza error si un item no es objeto válido', () => {
      expect(() => adaptListProducts([null])).toThrow(
        'Producto en el índice 0 no es un objeto válido'
      );
    });

    it('lanza error si falta id en algún producto', () => {
      expect(() =>
        adaptListProducts([{ brand: 'Apple' }])
      ).toThrow('Producto en el índice 0 no tiene la propiedad "id"');
    });
  });

  describe('adaptProductDetail', () => {
    it('convierte correctamente un producto (con detalles)', () => {
      const input = {
        id: 1,
        brand: 'Apple',
        model: 'iPhone',
        price: 999,
        internalMemory: [64, 128],
        primaryCamera: [12, 48],
        options: {
          colors: [{ code: 1, name: 'Black' }],
          storages: [{ code: 10, name: '128GB' }],
        },
      };

      const result = adaptProductDetail(input);

      expect(result).toBeInstanceOf(ProductDetail);
      expect(result.id).toBe('1');
      expect(result.price).toBe('999');
      expect(result.internalMemory).toEqual(['64', '128']);
      expect(result.primaryCamera).toEqual(['12', '48']);
      expect(result.options.colors[0].code).toBe(1);
      expect(result.options.storages[0].name).toBe('128GB');
    });

    it('convierte arrays vacíos correctamente', () => {
      const input = {
        id: 1,
        internalMemory: null,
        primaryCamera: undefined,
        options: {
          colors: [],
          storages: [],
        },
      };

      const result = adaptProductDetail(input);

      expect(result.internalMemory).toEqual([]);
      expect(result.primaryCamera).toEqual([]);
      expect(result.options.colors).toEqual([]);
    });

    it('lanza error si no es objeto válido', () => {
      expect(() => adaptProductDetail(null)).toThrow(
        'Se esperaba un objeto de detalle de producto del API'
      );
    });

    it('lanza error si es array', () => {
      expect(() => adaptProductDetail([])).toThrow(
        'Se esperaba un objeto de detalle de producto del API'
      );
    });

    it('lanza error si falta id', () => {
      expect(() =>
        adaptProductDetail({ brand: 'Apple' })
      ).toThrow('El producto no tiene la propiedad "id"');
    });
  });
});