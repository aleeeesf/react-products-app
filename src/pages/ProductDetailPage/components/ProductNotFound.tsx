import React from 'react';
import { Link } from 'react-router-dom';


/**
 * Componente que muestra un box para volver
 * al listado cuando no se encuentra el producto
 */
export const ProductNotFound: React.FC = () => {
	return (
		<>
			<div className='w-full'>
				<Link
					to="/"
					className='inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium transition-colors'
				>
					<span className='mr-2'>←</span>
					Volver a productos
				</Link>
				<div className='bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center'>
					<p className='text-yellow-900 font-semibold mb-2'>Producto no encontrado</p>
					<p className='text-yellow-700 text-sm mb-4'>
						No se pudo encontrar el producto solicitado
					</p>
					<Link
						to="/"
						className='inline-block px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-sm font-medium'
					>
						Volver al listado
					</Link>
				</div>
			</div>
		</>
	);
};
