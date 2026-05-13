"use client";
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/hooks';

const Navbar: React.FC = () => {
	const location = useLocation();
	const { cartCount } = useCart();
	
	const isProductDetail = location.pathname.includes('/product/');

	return (
		<header className='fixed bg-white w-full z-10 top-0 left-0 border-b border-gray-200 shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 py-4'>
				{/* Barra superior */}
				<div className='flex items-center justify-between mb-4'>
					{/* Logo */}
					<Link 
						to="/" 
						className='text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors'
						title="Ir a inicio"
					>
						TechStore
					</Link>
					{/* Carrito */}
					<div className='flex items-center gap-2'>
						<span className='text-sm text-gray-600'>Carrito:</span>
						<span className='bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm'>
							{cartCount}
						</span>
					</div>
				</div>

				{/* Breadcrumb */}
				<nav className='text-sm text-gray-600'>
					<Link to="/" className='hover:text-blue-600 transition-colors'>
						Productos
					</Link>
					{isProductDetail && (
						<>
							<span className='mx-2'>/</span>
							<span className='text-gray-900'>Detalles</span>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
