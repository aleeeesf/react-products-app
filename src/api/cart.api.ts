import type { AddToCartRequest, AddToCartResponse } from "@/models";

const BASE_URL = 'https://itx-frontend-test.onrender.com/api';

/**
 * Envía la selección del producto a la API del carrito
 * @param productId - ID del producto
 * @param colorCode - Código del color seleccionado
 * @param storageCode - Código del almacenamiento seleccionado
 * @throws Error si la petición falla
 * @returns Objeto con el número actualizado de items en el carrito { count: number }
 */
export async function postAddToCart(
    payload: AddToCartRequest
): Promise<AddToCartResponse> {
    // Validaciones básicas de entrada
    if (!payload.id || payload.colorCode === undefined || payload.storageCode === undefined) {
        throw new Error('[postAddToCart] Datos de selección incompletos');
    }

    try {
        const response = await fetch(`${BASE_URL}/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(10000) // 10s timeout
        });

        if (!response.ok) {
            throw new Error(
                `[postAddToCart] Error al añadir al carrito - Status ${response.status}: ${response.statusText}`
            );
        }

        const data = await response.json();
        
        return data;

    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('[postAddToCart] Error de red: no se pudo conectar con la API');
        }
        throw error;
    }
}