import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import axios from "axios";

const API_URL = "http://localhost:3000/products";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
      console.log("Fetched products");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAdd = async (newProduct) => {
    try {
      await axios.post(API_URL, newProduct);
      fetchProducts();
      console.log("Added new product");
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  const handleEdit = async (updatedProduct) => {
    const { id } = updatedProduct;
    try {
      await axios.put(`${API_URL}/${id}`, updatedProduct);
      fetchProducts();
      console.log("Updated product");
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  const handleDetail = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setSelectedProduct(response.data);
      console.log("Fetched product details");
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <div>
      <ProductForm onAdd={handleAdd} />
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-md w-full shadow-lg">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="h-48 object-contain mx-auto mb-4"
            />
            <h2 className="text-xl font-bold mb-1">{selectedProduct.title}</h2>
            <p className="text-gray-500 text-sm mb-1">
              {selectedProduct.category}
            </p>
            <p className="text-lg font-semibold mb-2">
              ${selectedProduct.price}
            </p>
            <p className="text-sm mb-3">{selectedProduct.description}</p>
            <p className="text-sm text-yellow-500">
              ⭐ {selectedProduct.rating?.rate} ({selectedProduct.rating?.count}
              개 리뷰)
            </p>
            <button
              className="mt-4 bg-gray-200 px-4 py-1 rounded"
              onClick={() => setSelectedProduct(null)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onDetail={handleDetail}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
