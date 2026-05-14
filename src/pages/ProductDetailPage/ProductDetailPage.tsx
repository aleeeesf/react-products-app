"use client";
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart, useProduct } from '@/hooks';
import type { AddToCartRequest } from '@/models';
import {
	ProductImage,
	ProductHeader,
	ProductDescriptions,
	ProductMoreSpecs,
	ProductSelection,
	LoadingProduct,
	ProductNotFound,
	ProductErrorState
} from '@/pages/ProductDetailPage/components';


const ProductDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { addToCart } = useCart();
	const { product, loading, error } = useProduct(id);
	const [showMoreSpecs, setShowMoreSpecs] = useState(false);

	if (loading) {
		return <LoadingProduct />;
	}

	if (error) {
		return <ProductErrorState error={error} />;
	}

	if (!product) {
		return <ProductNotFound />;
	}

	const handleAddToCart = (payload: AddToCartRequest) => {
		addToCart(payload);
	};

	return (
		<div>
			<Link
				to="/"
				className='inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium transition-colors'
			>
				<span className='mr-2'>←</span>
				Volver a productos
			</Link>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				<ProductImage product={product} />

				<div>
					<ProductHeader product={product} />
					<ProductDescriptions product={product} />
					<ProductMoreSpecs product={product} isOpen={showMoreSpecs} onToggle={() => setShowMoreSpecs(!showMoreSpecs)} />
					<ProductSelection
						key={product.id}
						product={product}
						onAddToCart={handleAddToCart}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailPage;