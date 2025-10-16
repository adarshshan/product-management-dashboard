import React, { useState, useEffect } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  Product,
} from "../services/api";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";
import ProductPreview from "../components/ProductPreview";

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleAddProduct = async (product: Omit<Product, "id">) => {
    try {
      const newProduct = await addProduct(product);
      setProducts([newProduct, ...products]);
      setIsFormModalOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      const updated = await updateProduct(product.id, product);
      setProducts(products.map((p) => (p.id === product.id ? updated : p)));
      setIsFormModalOpen(false);
      setEditingProduct(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  const handlePreview = (product: Product) => {
    console.log("Previewing product:", product);
    setPreviewProduct(product);
    setIsPreviewModalOpen(true);
  };

  const handleSave = (productData: Product | Omit<Product, "id">) => {
    if ("id" in productData) {
      handleUpdateProduct(productData as Product);
    } else {
      handleAddProduct(productData as Omit<Product, "id">);
    }
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto flex-grow">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
          <select
            className="block w-[30%] px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedCategory(e.target.value)
            }
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsFormModalOpen(true);
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto transition-colors"
        >
          Add Product
        </button>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDeleteProduct}
            onPreview={handlePreview}
          />
        ))}
      </div>

      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)}>
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => setIsFormModalOpen(false)}
        />
      </Modal>

      <ProductPreview
        product={previewProduct}
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
