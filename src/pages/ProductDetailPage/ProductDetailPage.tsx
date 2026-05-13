"use client";
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProduct } from '@/hooks';
import { 
  ProductImage, 
  ProductHeader, 
  ProductDescriptions, 
  ProductMoreSpecs, 
  ProductOptions, 
  ProductActions, 
  LoadingProduct,
  ProductNotFound,
  ProductErrorState
} from '@/pages/ProductDetailPage/components';


const ProductDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { product, loading, error } = useProduct(id);
	const [selectedColor, setSelectedColor] = useState<number | undefined>();
	const [selectedStorage, setSelectedStorage] = useState<number | undefined>();
	const [showMoreSpecs, setShowMoreSpecs] = useState(false);

	// Inicializar valores por defecto de color y almacenamiento
	useEffect(() => {
		if (product?.options?.colors?.length) {
			setSelectedColor(product.options.colors[0]?.code);
		}
		if (product?.options?.storages?.length) {
			setSelectedStorage(product.options.storages[0]?.code);
		}
	}, [product]);

	/**
	 * Maneja la adición del producto al carrito
	 * Valida que estén seleccionadas todas las opciones requeridas
	 */
	const handleAddToCart = () => {
		// Validar que las opciones requeridas estén seleccionadas
		if (hasColors && !selectedColor) {
			console.error('Seleción de color requerida');
			return;
		}

		if (hasStorages && !selectedStorage) {
			console.error('Selección de almacenamiento requerido');
			return;
		}


		console.log('Añadido al carrito:',{
			id,
			colorCode: selectedColor,
			storageCode: selectedStorage
		});
	};

	// Estado de carga
	if (loading) {
		return (
			<LoadingProduct />
		);
	}

	// Estado de error
	if (error) {
		return (
			<ProductErrorState error={error} />
		);
	}

	// Producto no encontrado
	if (!product) {
		return (
			<ProductNotFound />
		);
	}

	// Validaciones de datos requeridos
	const hasColors = (product.options?.colors?.length ?? 0) > 0;
	const hasStorages = (product.options?.storages?.length ?? 0) > 0;
	
	// Puede añadir al carrito si:
	// - Si hay colores, debe estar seleccionado un color
	// - Si hay almacenamientos, debe estar seleccionado un almacenamiento
	const canAddToCart = Boolean(
		(!hasColors || selectedColor) && // Si hay colores, requiere color; si no los hay, ok
		(!hasStorages || selectedStorage) // Si hay almacenamientos, requiere storage; si no los hay, ok
	);

	return (
		<div>
			{/* Back Link */}
			<Link
				to="/"
				className='inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium transition-colors'
			>
				<span className='mr-2'>←</span>
				Volver a productos
			</Link>

			{/* Contenido Principal */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Columna Imagen */}
				<ProductImage product={product} />

				{/* Columna detalles */}
				<div>
					<ProductHeader product={product} />
					<ProductDescriptions product={product} />
					<ProductMoreSpecs product={product} isOpen={showMoreSpecs} onToggle={() => setShowMoreSpecs(!showMoreSpecs)} />
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
			</div>
		</div>
	);
};

export default ProductDetailPage;
