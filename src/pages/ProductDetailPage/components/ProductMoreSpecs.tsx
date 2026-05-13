import React from 'react';
import type { ProductDetail } from '@/models';

interface ProductMoreSpecsProps {
	product: ProductDetail;
	isOpen: boolean;
	onToggle: () => void;
}

/**
 * Componente que muestra un acordeón con especificaciones técnicas adicionales
 * @param product - Datos del producto
 * @param isOpen - Estado del acordeón (expandido/contraído)
 * @param onToggle - Callback para cambiar el estado del acordeón
 */
export const ProductMoreSpecs: React.FC<ProductMoreSpecsProps> = ({ product, isOpen, onToggle }) => {
	return (
		<div className='border border-gray-200 rounded-lg overflow-hidden mb-4'>
			<button
				onClick={onToggle}
				className='w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between font-semibold text-gray-900 transition-colors'
			>
				<span>Más especificaciones técnicas</span>
				<svg
					className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
				</svg>
			</button>

			{isOpen && (
				<div className='p-4 bg-white border-t border-gray-200'>
					<div className='grid grid-cols-2 gap-4 text-sm'>
						{/* Red */}
						<div className='col-span-2'>
							<p className='text-gray-600 text-xs font-semibold uppercase mb-2'>Red</p>
						</div>
						<div>
							<p className='text-gray-500'>Tecnología</p>
							<p className='font-semibold text-gray-900'>{product.networkTechnology || 'N/A'}</p>
						</div>
						<div>
							<p className='text-gray-500'>Velocidad</p>
							<p className='font-semibold text-gray-900'>{product.networkSpeed || 'N/A'}</p>
						</div>

						{/* Pantalla detallada */}
						<div className='col-span-2 mt-4'>
							<p className='text-gray-600 text-xs font-semibold uppercase mb-2'>Pantalla</p>
						</div>
						<div>
							<p className='text-gray-500'>Tipo</p>
							<p className='font-semibold text-gray-900'>{product.displayType || 'N/A'}</p>
						</div>
						<div>
							<p className='text-gray-500'>Resolución</p>
							<p className='font-semibold text-gray-900'>{product.displayResolution || 'N/A'}</p>
						</div>

						{/* Procesador */}
						<div className='col-span-2 mt-4'>
							<p className='text-gray-600 text-xs font-semibold uppercase mb-2'>Procesador</p>
						</div>
						<div>
							<p className='text-gray-500'>Chipset</p>
							<p className='font-semibold text-gray-900'>{product.chipset || 'N/A'}</p>
						</div>
						<div>
							<p className='text-gray-500'>GPU</p>
							<p className='font-semibold text-gray-900'>{product.gpu || 'N/A'}</p>
						</div>

						{/* Memoria */}
						<div className='col-span-2 mt-4'>
							<p className='text-gray-600 text-xs font-semibold uppercase mb-2'>Memoria</p>
						</div>
						<div>
							<p className='text-gray-500'>Almacenamiento Interno</p>
							<p className='font-semibold text-gray-900'>
								{Array.isArray(product.internalMemory) && product.internalMemory.length > 0
									? product.internalMemory.join(', ')
									: 'N/A'}
							</p>
						</div>
						<div>
							<p className='text-gray-500'>Expandible</p>
							<p className='font-semibold text-gray-900'>{product.externalMemory || 'N/A'}</p>
						</div>

						{/* Conectividad */}
						<div className='col-span-2 mt-4'>
							<p className='text-gray-600 text-xs font-semibold uppercase mb-2'>Conectividad</p>
						</div>
						<div>
							<p className='text-gray-500'>WiFi</p>
							<p className='font-semibold text-gray-900'>
								{Array.isArray(product.wlan) && product.wlan.length > 0
									? product.wlan.join(' • ')
									: 'N/A'}
							</p>
						</div>
						<div>
							<p className='text-gray-500'>Bluetooth</p>
							<p className='font-semibold text-gray-900'>
								{Array.isArray(product.bluetooth) && product.bluetooth.length > 0
									? product.bluetooth.join(' • ')
									: 'N/A'}
							</p>
						</div>
						<div>
							<p className='text-gray-500'>GPS</p>
							<p className='font-semibold text-gray-900'>{product.gps || 'N/A'}</p>
						</div>
						<div>
							<p className='text-gray-500'>USB</p>
							<p className='font-semibold text-gray-900'>{product.usb || 'N/A'}</p>
						</div>

						{/* Otros */}
						<div className='col-span-2 mt-4'>
							<p className='text-gray-600 text-xs font-semibold uppercase mb-2'>Otros</p>
						</div>
						<div>
							<p className='text-gray-500'>Audio</p>
							<p className='font-semibold text-gray-900'>{product.audioJack ? 'Con Jack' : 'Sin Jack'}</p>
						</div>
						<div>
							<p className='text-gray-500'>NFC</p>
							<p className='font-semibold text-gray-900'>{product.nfc || 'No'}</p>
						</div>
						<div>
							<p className='text-gray-500'>Radio</p>
							<p className='font-semibold text-gray-900'>{product.radio || 'N/A'}</p>
						</div>
						<div>
							<p className='text-gray-500'>Sensores</p>
							<p className='font-semibold text-gray-900'>
								{Array.isArray(product.sensors) && product.sensors.length > 0
									? product.sensors.join(', ')
									: 'N/A'}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
