import React, { useState, useEffect } from 'react';
import { Product } from '../services/api';

interface ProductFormProps {
  product: Product | null;
  onSave: (product: Product | Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Product | Omit<Product, 'id'>>({ title: '', price: 0, description: '', category: '', image: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof Product, string>>>({});

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof Product, string>> = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.image) newErrors.image = 'Image URL is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        {errors.price && <p className="text-red-500">{errors.price}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border rounded"></textarea>
        {errors.description && <p className="text-red-500">{errors.description}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        {errors.category && <p className="text-red-500">{errors.category}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image URL</label>
        <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        {errors.image && <p className="text-red-500">{errors.image}</p>}
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </div>
    </form>
  );
};

export default ProductForm;