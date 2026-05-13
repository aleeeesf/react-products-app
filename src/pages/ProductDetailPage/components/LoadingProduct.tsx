import React from 'react';

/**
 * Componente que muestra un loader para cuando se
 * está cargando el producto
 */
export const LoadingProduct: React.FC = () => {
	return (
		<>
			<div className='w-full flex flex-col items-center justify-center py-32'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4'></div>
				<p className='text-gray-600 text-lg'>Cargando detalles del producto...</p>
			</div>
		</>
	);
};
