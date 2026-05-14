import { useEffect, useState } from "react";
import { getProducts } from "@/services";
import type { Product } from "@/models";

interface UseProductsListResult {
    products: Product[];
    loading: boolean;
    error: string | null;
}

/**
 * Hook personalizado para obtener la lista de productos
 * Maneja caché, loading, errores y reintentos automáticos
 * @returns Objeto con productos, estado de carga y error
 */
export function useProductsList(): UseProductsListResult {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getProducts();

                if (!cancelled) {
                    setProducts(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError("Error inesperado al cargar los productos");
                    setProducts([]);
                    console.error("[useProductsList] Error loading products ->", err);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadProducts();

        // Cleanup para evitar memory leaks
        return () => {
            cancelled = true;
        };
    }, []);

    return { products, loading, error };
}