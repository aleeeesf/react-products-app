import { useEffect, useState, useMemo } from "react";
import { CartContext } from "@/contexts";
import { addProductToCart } from "@/services";
import type { AddToCartRequest } from "@/models";
import { getCachedData, setCachedData } from "@/utils/cache.utils";

const CART_KEY = "cart_count";

function getInitialCartCount(): number {
    const stored = getCachedData<number>(CART_KEY);
    return stored ?? 0;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartCount, setCartCount] = useState<number>(getInitialCartCount);

    useEffect(() => {
        setCachedData(CART_KEY, cartCount);
    }, [cartCount]);

    const addToCart = useMemo(() => async (payload: AddToCartRequest) => {
        try {
            const response = await addProductToCart(payload);

            if (response) {
                setCartCount((prev) => prev + 1);
            }
        } catch (error) {
            console.log("[Cart] Error añadiendo al carrito ->", error);
        }
    }, []);

    const value = useMemo(() => ({ cartCount, addToCart }), [cartCount, addToCart]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}