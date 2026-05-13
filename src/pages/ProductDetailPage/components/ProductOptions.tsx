import React from 'react';
import type { ProductDetail } from '@/models';

interface ProductOptionsProps {
	product: ProductDetail;
	selectedColor: number | undefined;
	selectedStorage: number | undefined;
	onColorChange: (colorCode: number) => void;
	onStorageChange: (storageCode: number) => void;
}

/**
 * Componente que muestra los selectores de color y almacenamiento
 * @param product - Datos del producto
 * @param selectedColor - Código de color seleccionado
 * @param selectedStorage - Código de almacenamiento seleccionado
 * @param onColorChange - Callback cuando cambia el color
 * @param onStorageChange - Callback cuando cambia el almacenamiento
 */
export const ProductOptions: React.FC<ProductOptionsProps> = ({
	product,
	selectedColor,
	selectedStorage,
	onColorChange,
	onStorageChange
}) => {
	const hasColors = product.options?.colors && product.options.colors.length > 0;
	const hasStorages = product.options?.storages && product.options.storages.length > 0;

	return (
		<div className='mb-8'>
			<h2 className='text-lg font-semibold text-gray-900 mb-4'>Opciones</h2>

			{/* Selector de color */}
			{hasColors ? (
				<div className='mb-6'>
					<label className='block text-sm font-medium text-gray-700 mb-3'>Color</label>
					<div className='flex gap-2 flex-wrap'>
						{product.options?.colors?.map(color => (
							<button
								key={color.code}
								onClick={() => onColorChange(color.code)}
								className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
									selectedColor === color.code
										? 'border-blue-600 bg-blue-50 text-blue-900'
										: 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
								}`}
							>
								{color.name || 'Color desconocido'}
							</button>
						))}
					</div>
				</div>
			) : (
				<div className='mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 text-sm'>
					No hay opciones de color disponibles
				</div>
			)}

			{/* Selector de almacenamiento */}
			{hasStorages ? (
				<div className='mb-6'>
					<label className='block text-sm font-medium text-gray-700 mb-3'>Almacenamiento</label>
					<div className='flex gap-2 flex-wrap'>
						{product.options?.storages?.map(storage => (
							<button
								key={storage.code}
								onClick={() => onStorageChange(storage.code)}
								className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
									selectedStorage === storage.code
										? 'border-blue-600 bg-blue-50 text-blue-900'
										: 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
								}`}
							>
								{storage.name || 'Almacenamiento desconocido'}
							</button>
						))}
					</div>
				</div>
			) : (
				<div className='mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 text-sm'>
					No hay opciones de almacenamiento disponibles
				</div>
			)}
		</div>
	);
};
