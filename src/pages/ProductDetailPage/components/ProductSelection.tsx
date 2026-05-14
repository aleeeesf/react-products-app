import React, { useState } from 'react';
import type { ProductDetail } from '@/models';
import { ProductOptions } from './ProductOptions';
import { ProductActions } from './ProductActions';
import type { AddToCartRequest } from '@/models';

interface ProductSelectionProps {
	product: ProductDetail;
	onAddToCart: (payload: AddToCartRequest) => void;
}

export const ProductSelection: React.FC<ProductSelectionProps> = ({
	product,
	onAddToCart
}) => {
	const defaultColor = product?.options?.colors?.[0]?.code;
	const defaultStorage = product?.options?.storages?.[0]?.code;

	const [selectedColor, setSelectedColor] = useState<number | undefined>(defaultColor);
	const [selectedStorage, setSelectedStorage] = useState<number | undefined>(defaultStorage);

	const hasColors = (product.options?.colors?.length ?? 0) > 0;
	const hasStorages = (product.options?.storages?.length ?? 0) > 0;

	const canAddToCart = Boolean(
		(!hasColors || selectedColor) &&
		(!hasStorages || selectedStorage)
	);

	const handleAddToCart = () => {
		if (hasColors && !selectedColor) {
			console.error('Seleción de color requerida');
			return;
		}

		if (hasStorages && !selectedStorage) {
			console.error('Selección de almacenamiento requerido');
			return;
		}

		if (product.id && selectedColor && selectedStorage) {
			console.log('Añadido al carrito:', {
				id: product.id,
				colorCode: selectedColor,
				storageCode: selectedStorage
			});
			onAddToCart({
				id: product.id,
				colorCode: selectedColor,
				storageCode: selectedStorage
			});
		}
	};

	return (
		<div>
			<ProductOptions
				product={product}
				selectedColor={selectedColor}
				selectedStorage={selectedStorage}
				onColorChange={setSelectedColor}
				onStorageChange={setSelectedStorage}
			/>
			<ProductActions
				product={product}
				canAddToCart={canAddToCart}
				onAddToCart={handleAddToCart}
			/>
		</div>
	);
};