"use client";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebounce, useProductsList } from '@/hooks';


const ProductListPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 300);
	const { products, loading, error } = useProductsList();
	
	// Filtrar productos de forma segura y con debounce
	const filteredProducts = products.filter(product => {
		const brand = product.brand || '';
		const model = product.model || '';
		const searchLower = debouncedSearch.toLowerCase();
		
		return (
			brand.toLowerCase().includes(searchLower) ||
			model.toLowerCase().includes(searchLower)
		);
	});

	// Estado de carga
	if (loading) {
		return (
			<div className='w-full flex flex-col items-center justify-center py-20'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4'></div>
				<p className='text-gray-600 text-lg'>Cargando productos...</p>
			</div>
		);
	}

	// Estado de error
	if (error) {
		return (
			<div className='w-full'>
				<div className='bg-red-50 border border-red-200 rounded-lg p-6 mb-6'>
					<h3 className='text-red-900 font-semibold mb-2'>Error al cargar los productos</h3>
					<p className='text-red-700 text-sm mb-4'>{error}</p>
					<button
						onClick={() => window.location.reload()}
						className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium'
					>
						Reintentar
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='w-full'>
			{/* Barra de búsqueda */}
			<div className='mb-8'>
				<div className='lg:w-72 flex gap-3 items-center'>
					<input
						id="search"
						name="search"
						type="text"
						placeholder="Buscar por marca o modelo..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500'
						aria-label="Buscar productos"
					/>
				</div>
				{searchTerm && (
					<p className='text-sm text-gray-600 mt-2'>
						Se encontraron <span className='font-semibold'>{filteredProducts.length}</span> resultado(s)
					</p>
				)}
			</div>

			{/* Grid de los productos */}
			{filteredProducts.length > 0 ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{filteredProducts.map(product => (
						<Link
							key={product.id}
							to={`/product/${product.id}`}
							className='bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group'
						>
							<div className='aspect-square bg-gray-100 overflow-hidden'>
								{product.imgUrl ? (
									<img
										src={product.imgUrl}
										alt={[product.brand, product.model].filter(Boolean).join(' ') || 'producto'}
										className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
										loading="lazy"
									/>
								) : (
									<div className='w-full h-full flex items-center justify-center bg-gray-200 text-gray-500'>
										No hay imagen
									</div>
								)}
							</div>
							<div className='p-4'>
								<p className='text-xs text-gray-500 font-semibold uppercase tracking-wide'>
									{product.brand}
								</p>
								<h3 className='text-sm font-semibold text-gray-900 mt-2 line-clamp-2'>
									{product.model}
								</h3>
								<p className='text-lg font-bold text-blue-600 mt-3'>
									{product.price && !isNaN(Number(product.price)) 
									? `${product.price}€` 
									: (product.price || 'Consultar precio')}
								</p>
							</div>
						</Link>
					))}
				</div>
			) : (
				<div className='text-center py-16'>
					<div className='mb-4'>
						<svg className='w-12 h-12 mx-auto text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
						</svg>
					</div>
					<p className='text-gray-500 text-lg font-medium'>
						{searchTerm ? 'No se encontraron productos' : 'No hay productos disponibles'}
					</p>
					{searchTerm && (
						<p className='text-gray-400 text-sm mt-2'>
							Intenta cambiar los términos de búsqueda
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export default ProductListPage;
