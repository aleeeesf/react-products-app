/**
* Request para agregar un producto al carrito
*/
export interface AddToCartRequest {
    id: string;
    colorCode: number;
    storageCode: number;
}

/**
 * Respuesta de la API al agregar un producto al carrito
*/
export interface AddToCartResponse {
    count: number;
}