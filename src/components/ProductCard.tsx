import React from 'react';
import { Product } from '../services/api';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
      <h2 className="text-xl font-bold mt-4">{product.title}</h2>
      <p className="text-gray-700">${product.price}</p>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <div className="mt-4 flex justify-end">
        <button onClick={() => onEdit(product)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
        <button onClick={() => onDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </div>
  );
};

export default ProductCard;