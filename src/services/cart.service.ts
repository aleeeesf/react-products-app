import { postAddToCart } from "@/api";
import { type AddToCartRequest, type AddToCartResponse } from "@/models";

/**
 * Añade un producto al carrito
 * @param payload - ID producto + color + almacenamiento
 * @throws Error si datos inválidos o fallo API
 * @returns Número actualizado de productos en carrito
 */
export async function addProductToCart(
    payload: AddToCartRequest
): Promise<AddToCartResponse> {

    // Validación básica
    if (!payload.id || typeof payload.id !== "string") {
        throw new Error("ID de producto inválido");
    }

    if (typeof payload.colorCode !== "number") {
        throw new Error("ColorCode inválido");
    }

    if (typeof payload.storageCode !== "number") {
        throw new Error("StorageCode inválido");
    }

    try {
        const response = await postAddToCart(payload);

        if (!response || typeof response.count !== "number") {
            throw new Error("Respuesta de API inválida: 'count' no es un número");
        }

        return response;
    } catch (error) {
        throw new Error(
            `[addProductToCart] Error al añadir producto ${payload.id} al carrito -> ${
                error instanceof Error
                    ? error.message
                    : "Error desconocido"
            }`
        );
    }
}