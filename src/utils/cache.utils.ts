const ONE_HOUR = 60 * 60 * 1000;

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

/**
 * Obtiene un valor de la caché de localStorage
 * Verifica expiración automáticamente (1 hora por defecto)
 * Si el caché expiró o es inválido, lo elimina y retorna null
 * @template T - Tipo genérico del valor almacenado
 * @param key - Clave del elemento en caché
 * @returns Datos de la caché si es válido, null si no existe o expiró
 */
export function getCachedData<T>(key: string, expiration: number = ONE_HOUR): T | null {
  try {
    const cached = localStorage.getItem(key);

    if (!cached) return null;

    // Parsear JSON de forma segura
    let parsedCache: CacheItem<T>;
    try {
        parsedCache = JSON.parse(cached);
    } catch (parseError) {
        console.warn(`[Cache] JSON Inválido para la key "${key}"`);
        localStorage.removeItem(key);
        return null;
    }

    // Validar estructura del caché
    if (!parsedCache || typeof parsedCache !== 'object' || !('data' in parsedCache) || !('timestamp' in parsedCache)) {
        console.warn(`[Cache] Caché inválida para la key "${key}"`);
        localStorage.removeItem(key);
        return null;
    }

    // Verificar expiración
    const isExpired = Date.now() - parsedCache.timestamp > expiration;
    if (isExpired) {
        localStorage.removeItem(key);
        return null;
    }

    return parsedCache.data;
  } catch (error) {
        console.error(`[Cache] Error leyendo la caché para la key "${key}":`, error);
        try {
            localStorage.removeItem(key);
        } catch (clearError) {
            console.error(`[Cache] Error limpiando la caché apra la key "${key}":`, clearError);
        }
        return null;
  }
}

/**
 * Guarda un valor en el caché de localStorage con timestamp
 * @template T - Tipo genérico del valor a almacenar
 * @param key - Clave del elemento en caché
 * @param data - Datos a almacenar
 * @throws Error si hay problemas al escribir en localStorage
 */
export function setCachedData<T>(key: string, data: T): void {
  try {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
    };

    const jsonString = JSON.stringify(cacheItem);
    localStorage.setItem(key, jsonString);

  } catch (error) {
    // ! localStorage.setItem puede lanzar QuotaExceededError
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.error(`[Cache] Se excedió el límite de almacenamiento para la key "${key}"`);
    } else {
      console.error(`[Cache] Error al escribir en la caché para la key "${key}":`, error);
    }
  }
}