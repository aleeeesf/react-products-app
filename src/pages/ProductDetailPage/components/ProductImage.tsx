import React from 'react';
import type { ProductDetail } from '@/models';

/**
 * Componente que muestra la imagen del producto
 * @param product - Datos del producto
 */
export const ProductImage: React.FC<{ product: ProductDetail }> = ({ product }) => {
	return (
		<div className='flex items-start lg:sticky top-24'>
			<div className='w-full bg-white rounded-lg overflow-hidden aspect-square p-4'>
				{product.imgUrl ? (
					<img
						src={product.imgUrl}
						alt={[product.brand, product.model].filter(Boolean).join(' ') || 'producto'}
						className='w-full h-full object-contain p-4'
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center text-gray-400'>
						No hay imagen disponible
					</div>
				)}
			</div>
		</div>
	);
};
