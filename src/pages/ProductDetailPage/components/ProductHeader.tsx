import React from 'react';
import type { ProductDetail } from '@/models';

/**
 * Componente que muestra el header del producto (marca, modelo, precio)
 * @param product - Datos del producto
 */
export const ProductHeader: React.FC<{ product: ProductDetail }> = ({ product }) => {
	return (
		<div className='mb-8'>
			<p className='text-sm text-gray-500 font-semibold uppercase tracking-wide mb-2'>
				{product.brand}
			</p>
			<h1 className='text-3xl font-bold text-gray-900 mb-3'>
				{product.model}
			</h1>
			<p className='text-xl font-bold text-gray-900'>
				{product.price && !isNaN(Number(product.price)) 
					? `${product.price}€` 
					: (product.price || 'Consultar precio')}
			</p>
		</div>
	);
};
