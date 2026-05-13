const ONE_HOUR = 60 * 60 * 1000;

interface CacheItem<T> {
  data: T;
  timestamp: number;
}


export function getCachedData<T>(key: string): T | null {
  const cached = localStorage.getItem(key);

  if (!cached) return null;

  try {
    const parsedCache: CacheItem<T> = JSON.parse(cached);

    const isExpired = Date.now() - parsedCache.timestamp > ONE_HOUR;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return parsedCache.data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}



export function setCachedData<T>(key: string, data: T): void {
  const cacheItem: CacheItem<T> = {
    data,
    timestamp: Date.now(),
  };

  localStorage.setItem(key, JSON.stringify(cacheItem));
}