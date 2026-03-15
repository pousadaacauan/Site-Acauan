
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from './ProductCard';

// Todos os quartos são Lofts - sem filtro de categoria necessário

interface ProductGridProps {
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick }) => {
  return (
    <section id="products" className="py-32 px-6 md:px-12 bg-[#F5F2EB]">
      <div className="max-w-[1800px] mx-auto">
        
        <div className="flex flex-col items-center text-center mb-24 space-y-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E]">Nossos Lofts</span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26]">Escolha seu refúgio</h2>
          <p className="text-[#5D5A53] max-w-xl">
            5 lofts aconchegantes, cada um com seu charme único. Adicional de R$100 por pessoa extra ou criança.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
