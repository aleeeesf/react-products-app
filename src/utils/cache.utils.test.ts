import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getCachedData, setCachedData } from './cache.utils';

interface testData{
  a: number;
}

describe('Suite de tests para las utilidades de la caché', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('guarda y obtiene datos de la caché', () => {
    setCachedData('test_1', { a: 1 });
    const value = getCachedData<testData>('test_1');
    expect(value).toEqual({ a: 1 });
  });

  it('devuelve null para datos expirados de la caché', () => {
    const payload = { data: { a: 1 }, timestamp: Date.now() - 10_000 };
    localStorage.setItem('test_2', JSON.stringify(payload));
    const value = getCachedData<testData>('test_2"', 1_000);
    expect(value).toBeNull();
  });

  it('elimina los datos si el JSON es inválido y devuelve null', () => {
    localStorage.setItem('test_3', '{bad-json');
    const removeSpy = vi.spyOn(Storage.prototype, 'removeItem');
    const value = getCachedData('test_3');
    expect(value).toBeNull();
    expect(removeSpy).toHaveBeenCalledWith('test_3');
  });
});
