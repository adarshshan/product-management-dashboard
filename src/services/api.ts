import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  const response = await axios.put(`${API_URL}/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/products/${id}`);
};

export const getCategories = async (): Promise<string[]> => {
    const response = await axios.get(`${API_URL}/products/categories`);
    return response.data;
};