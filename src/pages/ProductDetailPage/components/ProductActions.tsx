import React from 'react';
import type { ProductDetail } from '@/models';

interface ProductActionsProps {
    product: ProductDetail;
    canAddToCart: boolean;
    onAddToCart: () => void;
}

/**
 * Componente que muestra las acciones de compra del producto.
 * Maneja visualmente los estados habilitado/deshabilitado basándose en la 
 * selección del usuario y la validez del precio.
 */
export const ProductActions: React.FC<ProductActionsProps> = ({ product, canAddToCart, onAddToCart }) => {
    // Validación de precio para asegurar que es una transacción posible
    const isPriceValid = product.price && !isNaN(Number(product.price)) && Number(product.price) > 0;
    
    // El botón solo es funcional si ambas condiciones se cumplen
    const isDisabled = !canAddToCart || !isPriceValid;

    return (
        <>
            {/* Botón Añadir al carrito */}
            <button
                onClick={onAddToCart}
                disabled={isDisabled}
                className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-lg mb-8 ${
                    !isDisabled
                        ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-sm hover:shadow-md'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
                }`}
                title={
                    !isPriceValid 
                        ? 'Precio no disponible para la venta' 
                        : !canAddToCart 
                            ? 'Selecciona color y almacenamiento' 
                            : 'Añadir producto al carrito'
                }
            >
                {!isPriceValid ? 'No Disponible' : 'Añadir al Carrito'}
            </button>
        </>
    );
};