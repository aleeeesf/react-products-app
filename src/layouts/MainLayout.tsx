"use client";
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components';

const MainLayout: React.FC = () => {
	return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar/>

      <main className="flex-1 max-w-7xl mx-auto w-full h-full px-4 py-6 mt-24">
        <Outlet />
      </main>
    </div>
	);
};

export default MainLayout;
