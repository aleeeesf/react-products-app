import { useEffect, useState } from "react";

/**
 * Hook personalizado para debounce de valores
 * Retrasa la actualización de un valor hasta que deje de cambiar durante un tiempo especificado
 * @template T - Tipo genérico del valor a debounce
 * @param value - Valor original que se desea debounce
 * @param delay - Tiempo en milisegundos para esperar (por defecto 300ms)
 * @returns Valor debounceado
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}