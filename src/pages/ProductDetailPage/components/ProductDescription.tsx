import React from 'react';
import type { ProductDetail } from '@/models';

/**
 * Componente que muestra las especificaciones principales del producto
 * @param product - Datos del producto
 */
export const ProductDescriptions: React.FC<{ product: ProductDetail }> = ({ product }) => {
	return (
		<div className='mb-8 pb-8 border-b border-gray-200'>
			<h2 className='text-lg font-semibold text-gray-900 mb-4'>
				Especificaciones Principales
			</h2>

			<div className='grid grid-cols-2 gap-4 text-sm'>
				{/* CPU */}
				<div className='p-2'>
					<p className='text-gray-400 text-xs font-semibold uppercase'>CPU</p>
					<p className='font-semibold text-gray-900 mt-1'>{product.cpu || 'No Disponible'}</p>
				</div>

				{/* RAM */}
				<div className='p-2'>
					<p className='text-gray-400 text-xs font-semibold uppercase'>RAM</p>
					<p className='font-semibold text-gray-900 mt-1'>{product.ram || 'No Disponible'}</p>
				</div>

				{/* Sistema Operativo */}
				<div className='p-2'>
					<p className='text-gray-400 text-xs font-semibold uppercase'>Sistema Operativo</p>
					<p className='font-semibold text-gray-900 mt-1'>{product.os || 'No Disponible'}</p>
				</div>

				{/* Resolución */}
				<div className='p-2'>
					<p className='text-gray-400 text-xs font-semibold uppercase'>Resolución</p>
					<p className='font-semibold text-gray-900 mt-1'>{product.displaySize || 'No Disponible'}</p>
				</div>

				{/* Batería */}
				<div className='p-2'>
					<p className='text-gray-400 text-xs font-semibold uppercase'>Batería</p>
					<p className='font-semibold text-gray-900 mt-1 line-clamp-2'>{product.battery || 'No Disponible'}</p>
				</div>

				{/* Cámaras - Principal */}
				<div className='p-2'>
					<p className='text-gray-400 text-xs font-semibold uppercase'>Cámara Principal</p>
					<p className='font-semibold text-gray-900 mt-1'>
						{Array.isArray(product.primaryCamera) && product.primaryCamera.length > 0
							? product.primaryCamera.join(' • ')
							: 'No Disponible'}
					</p>
				</div>

				{/* Cámaras - Frontal */}
				<div className='p-2'>
					<p className='text-gray-400 text-xs font-semibold uppercase'>Cámara Frontal</p>
					<p className='font-semibold text-gray-900 mt-1'>
						{Array.isArray(product.secondaryCamera) && product.secondaryCamera.length > 0
							? product.secondaryCamera.join(' • ')
							: 'No Disponible'}
					</p>
				</div>

				{/* Dimensiones */}
				<div className='p-2'>
					<p className='text-gray-400 text-xs font-semibold uppercase'>Dimensiones</p>
					<p className='font-semibold text-gray-900 mt-1'>{product.dimentions || 'No Disponible'}</p>
				</div>

				{/* Peso */}
				<div className='p-2'>
					<p className='text-gray-400 text-xs font-semibold uppercase'>Peso</p>
					<p className='font-semibold text-gray-900 mt-1'>{product.weight ? `${product.weight}g` : 'No Disponible'}</p>
				</div>
			</div>
		</div>
	);
};
