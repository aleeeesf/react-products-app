import { useEffect, useState } from "react";
import { getProducts } from "@/services";
import type { Product } from "@/models";


interface UseProductsListResult {
    products: Product[];
    loading: boolean;
    error: string | null;
}

export function useProductsList(): UseProductsListResult {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getProducts()
            .then(data => setProducts(data.products))
            .catch(() => setError("No se pudo cargar la lista de productos"))
            .finally(() => setLoading(false));
    }, []);
    return { products, loading, error };
}