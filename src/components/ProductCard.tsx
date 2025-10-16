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
      className="relative bg-white shadow-md rounded-lg p-4 flex flex-col h-96"
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
      <div className="absolute top-1 right-1 mt-4 flex justify-end space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(product);
          }}
          className="p-2 rounded-full text-blue-500 bg-blue-100 hover:bg-blue-200 hover:text-blue-600 transition-colors duration-200"
          aria-label="Edit Product"
          title="Edit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(product.id);
          }}
          className="p-2 rounded-full text-red-500 bg-red-100 hover:bg-red-200 hover:text-red-600 transition-colors duration-200"
          aria-label="Delete Product"
          title="Delete"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
