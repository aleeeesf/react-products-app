import { useEffect, useState } from "react";
import { getProductDetail } from "@/services";
import type { ProductDetail } from "@/models";

interface UseProductResult {
    product: ProductDetail | undefined;
    loading: boolean;
    error: string | null;
}

/**
 * Hook personalizado para obtener los detalles de un producto específico
 * Maneja caché, loading, errores y reacciona a cambios de ID
 * @param productId - ID único del producto a cargar (opcional)
 * @returns Objeto con detalles del producto, estado de carga y error
 */
export function useProduct(productId?: string): UseProductResult {
    const [product, setProduct] = useState<ProductDetail | undefined>(undefined);
    const [loading, setLoading] = useState(Boolean(productId));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!productId?.trim()) return;

        let cancelled = false;

        const loadProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const productData = await getProductDetail(productId);

                if (!cancelled) {
                    setProduct(productData);
                }
            } catch (err) {
                if (!cancelled) {
                    setError("Error inesperado al cargar el producto");
                    setProduct(undefined);
                    console.error(`[useProduct] Error cargando producto ${productId} ->`, err);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadProduct();

        return () => {
            cancelled = true;
        };
    }, [productId]);

    return { product, loading, error };
}