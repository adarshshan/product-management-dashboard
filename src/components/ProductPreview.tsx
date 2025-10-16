import React from "react";
import { Product } from "../services/api";
import Modal from "./Modal";

interface ProductPreviewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="50rem">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-contain rounded-lg"
            style={{ maxHeight: "400px" }}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-800 font-semibold mb-4">
            ${product.price}
          </p>
          <p className="text-md text-gray-600 mb-4">
            <span className="font-bold">Category:</span> {product.category}
          </p>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ProductPreview;
