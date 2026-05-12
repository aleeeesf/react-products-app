"use client";
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { productsMock } from '@/mocks'

export type ProductListPageProps = {
	// types...
}

const ProductListPage: React.FC<ProductListPageProps>  = ({}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const products = productsMock;

	const filteredProducts = useMemo(() => {
		return products.filter(product =>
			product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.model.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [searchTerm, products]);

	return (
		<div className='w-full'>
			{/* Barra de búsqueda */}
			<div className='mb-8'>
				<div className='flex gap-3 items-center'>
					<input
						type="text"
						placeholder="Buscar por marca o modelo..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500'
					/>
					<button className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'>
						Buscar
					</button>
				</div>
				{searchTerm && (
					<p className='text-sm text-gray-600 mt-2'>
						Se encontraron <span className='font-semibold'>{filteredProducts.length}</span> resultado(s)
					</p>
				)}
			</div>

			{/* Grid de los productos */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{filteredProducts.map(product => (
					<Link
						key={product.id}
						to={`/product/${product.id}`}
						className='bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group'
					>
						<div className='aspect-square bg-gray-100 overflow-hidden'>
							<img
								src={product.imgUrl}
								alt={product.model}
								className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
							/>
						</div>
						<div className='p-4'>
							<p className='text-xs text-gray-500 font-semibold uppercase tracking-wide'>
								{product.brand}
							</p>
							<h3 className='text-sm font-semibold text-gray-900 mt-2 line-clamp-2'>
								{product.model}
							</h3>
							<p className='text-lg font-bold text-blue-600 mt-3'>
								{product.price ? `$${product.price}` : 'Consultar'}
							</p>
						</div>
					</Link>
				))}
			</div>

			{filteredProducts.length === 0 && (
				<div className='text-center py-12'>
					<p className='text-gray-500 text-lg'>No se encontraron productos</p>
				</div>
			)}
		</div>
	);
};

export default ProductListPage;
