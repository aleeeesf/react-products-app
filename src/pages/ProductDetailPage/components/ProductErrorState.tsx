import React from 'react';
import { Link } from 'react-router-dom';

interface ProductNotFoundProps {
	error: string;
}

/**
 * Componente de estado de error para la vista de detalle de producto
 * @param {string} error - Mensaje descriptivo del error capturado al obtener el producto.
 */
export const ProductErrorState: React.FC<ProductNotFoundProps> = ({ error }) => {
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
				<div className='bg-red-50 border border-red-200 rounded-lg p-8'>
					<h3 className='text-red-900 font-semibold mb-2'>Error al cargar el producto</h3>
					<p className='text-red-700 text-sm'>{error}</p>
					<div className="mt-4 flex items-center  gap-2">
						<button
							onClick={() => window.location.reload()}
							className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium'
						>
							Reintentar
						</button>
						<Link
							to="/"
							className='inline-block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm font-medium'
						>
							Volver a productos
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};
