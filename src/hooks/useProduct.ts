import { useEffect, useState } from "react";
import { getProductDetail } from "@/services";
import type { ProductDetail } from "@/models";

export function useProduct(productId?: string) {
    const [product, setProduct] = useState<ProductDetail>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!productId) return;

        setLoading(true);
        setError(null);

        getProductDetail(productId)
            .then((product) => setProduct(product))
            .catch(() => setError("No se pudo cargar el producto"))
            .finally(() => setLoading(false));
    }, [productId]);
    return { product, loading, error };
}