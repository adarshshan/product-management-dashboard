import React, { useState } from "react";
import { Product } from "../services/api";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onPreview: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  onPreview,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxChars = 100;
  const isLongDescription = product.description.length > maxChars;
  const truncatedDescription = isLongDescription
    ? product.description.slice(0, maxChars) + "..."
    : product.description;

  return (
    <div
      onClick={() => onPreview(product)}
      className="bg-white shadow-md rounded-lg p-4 flex flex-col h-96"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-[50%] w-full object-cover rounded-t-lg"
      />
      <div className="description-box flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md custom-scrollbar">
        <h2 className="text-xl font-bold text-gray-800 truncate">
          {product.title}
        </h2>
        <p className="text-lg font-semibold text-green-600">${product.price}</p>
        <p className="text-gray-600 mt-2 text-sm">
          {isExpanded || !isLongDescription
            ? product.description
            : truncatedDescription}
        </p>
        {isLongDescription && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium mt-2"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => onEdit(product)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
