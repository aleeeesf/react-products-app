import { useEffect, useState, createContext } from "react";
import { addProductToCart } from "@/services";
import type { AddToCartRequest } from "@/models";
import { getCachedData, setCachedData } from "@/utils/cache.utils";

const CART_KEY = "cart_count";

export interface CartContextType {
    cartCount: number;
    addToCart: (payload: AddToCartRequest) => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        const stored = getCachedData<number>(CART_KEY);
        if (stored !== null) {
            setCartCount(stored);
        }
    }, []);

    useEffect(() => {
        setCachedData(CART_KEY, cartCount);
    }, [cartCount]);

    const addToCart = async (payload: AddToCartRequest) => {
        try {
            const response = await addProductToCart(payload);

            if (response) {
                setCartCount((prev) => prev + 1);
            }
        } catch (error) {
            console.log("[Cart] Error añadiendo al carrito ->", error);
        }
    };

    return (
        <CartContext.Provider value={{ cartCount, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}