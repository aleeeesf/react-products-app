"use client";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProduct } from '@/hooks/useProduct';
import { useParams } from "react-router-dom";

export type ProductDetailPageProps = {
	// types...
}

const ProductDetailPage: React.FC<ProductDetailPageProps>  = ({}) => {
	const { id } = useParams();
	const { product, loading, error } = useProduct(id)
	const [selectedColor, setSelectedColor] = useState<number>();
	const [selectedStorage, setSelectedStorage] = useState<number | undefined>();

	useEffect(() => {
		if (product) {
			setSelectedColor(product.options.colors[0]?.code);
			setSelectedStorage(product.options.storages[0]?.code);
		}
	}, [product]);

	const handleAddToCart = () => {
		console.log('Añadido al carrito:', {
			id: id,
			colorCode: selectedColor,
			storageCode: selectedStorage
		});
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;
	if (!product) return <p>No product</p>;

	return (
		<div className=''>
			{/* Back Link */}
			<Link
				to="/"
				className='inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium transition-colors'
			>
				<span className='mr-2'>←</span>
				Volver a productos
			</Link>

			{/* Main Content */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Image Column */}
				<div className='flex items-start sticky top-24'>
					<div className='w-full bg-gray-100 rounded-lg overflow-hidden aspect-square'>
						<img
							src={product.imgUrl}
							alt={product.model}
							className='w-full h-full object-cover'
						/>
					</div>
				</div>

				{/* Details Column */}
				<div>
					{/* Header */}
					<div className='mb-8'>
						<p className='text-sm text-gray-500 font-semibold uppercase tracking-wide mb-2'>
							{product.brand}
						</p>
						<h1 className='text-3xl font-bold text-gray-900 mb-3'>
							{product.model}
						</h1>
						<p className='text-3xl font-bold text-blue-600'>
							${product.price}
						</p>
					</div>

					{/* Description */}
					<div className='mb-8 pb-8 border-b border-gray-200'>
						<h2 className='text-lg font-semibold text-gray-900 mb-4'>
							Especificaciones
						</h2>
						<div className='grid grid-cols-2 gap-4 text-sm'>
							<div>
								<p className='text-gray-600'>Procesador</p>
								<p className='font-semibold text-gray-900'>{product.cpu}</p>
							</div>
							<div>
								<p className='text-gray-600'>RAM</p>
								<p className='font-semibold text-gray-900'>{product.ram}</p>
							</div>
							<div>
								<p className='text-gray-600'>Sistema Operativo</p>
								<p className='font-semibold text-gray-900'>{product.os}</p>
							</div>
							<div>
								<p className='text-gray-600'>Pantalla</p>
								<p className='font-semibold text-gray-900'>{product.displaySize}</p>
							</div>
							<div>
								<p className='text-gray-600'>Batería</p>
								<p className='font-semibold text-gray-900'>{product.battery}</p>
							</div>
							<div>
								<p className='text-gray-600'>Peso</p>
								<p className='font-semibold text-gray-900'>{product.weight}g</p>
							</div>
						</div>
					</div>

					{/* Actions Section */}
					<div className='mb-8'>
						<h2 className='text-lg font-semibold text-gray-900 mb-4'>
							Opciones
						</h2>

						{/* Color Selector */}
						<div className='mb-6'>
							<label className='block text-sm font-medium text-gray-700 mb-3'>
								Color
							</label>
							<div className='flex gap-2'>
								{product.options.colors.map(color => (
									<button
										key={color.code}
										onClick={() => setSelectedColor(color.code)}
										className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
											selectedColor === color.code
												? 'border-blue-600 bg-blue-50 text-blue-900'
												: 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
										}`}
									>
										{color.name}
									</button>
								))}
							</div>
						</div>

						{/* Storage Selector */}
						<div className='mb-6'>
							<label className='block text-sm font-medium text-gray-700 mb-3'>
								Almacenamiento
							</label>
							<div className='flex gap-2 flex-wrap'>
								{product.options.storages.map(storage => (
									<button
										key={storage.code}
										onClick={() => setSelectedStorage(storage.code)}
										className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
											selectedStorage === storage.code
												? 'border-blue-600 bg-blue-50 text-blue-900'
												: 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
										}`}
									>
										{storage.name}
									</button>
								))}
							</div>
						</div>

						{/* Add to Cart Button */}
						<button
							onClick={handleAddToCart}
							className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 text-lg'
						>
							Añadir al Carrito
						</button>
					</div>

					{/* Additional Details */}
					<div className='bg-gray-50 rounded-lg p-6 text-sm'>
						<p className='text-gray-600 leading-relaxed'>
							<span className='font-semibold text-gray-900'>Estado:</span> {product.status}
						</p>
						<p className='text-gray-600 leading-relaxed mt-2'>
							<span className='font-semibold text-gray-900'>Dimensiones:</span> {product.dimentions}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailPage;
