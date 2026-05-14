import { createContext } from "react";
import type { AddToCartRequest } from "@/models";

export interface CartContextType {
    cartCount: number;
    addToCart: (payload: AddToCartRequest) => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);