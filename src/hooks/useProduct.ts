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
    const [product, setProduct] = useState<ProductDetail | undefined>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Si no hay ID, no hacer nada
        if (!productId || productId.trim() === '') {
            setProduct(undefined);
            setLoading(false);
            setError(null);
            return;
        }

        let isMounted = true;

        const loadProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const productData = await getProductDetail(productId);

                if (isMounted) {
                    setProduct(productData);
                }
            } catch (err) {
                if (isMounted) {
                    const errorMessage = "Error inesperado al cargar el producto";
                    setError(errorMessage);
                    setProduct(undefined);
                    console.error(`[useProduct] Error cargando los productos ${productId} ->`, err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadProduct();

        // Cleanup para evitar memory leaks y condiciones de carrera
        return () => {
            isMounted = false;
        };
    }, [productId]);

    return { product, loading, error };
}