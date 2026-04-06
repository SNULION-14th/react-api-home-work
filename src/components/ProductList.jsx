import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/products",
});

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await instance.get("");
      setProducts(response.data);
    } catch (e) {
      console.error("Fetch products error", e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await instance.delete(`/${id}`);
      await fetchProducts();
    } catch (e) {
      console.log("Delete product error", e);
    }
  };

  const handleAdd = async (newProduct) => {
    try {
      await instance.post("", newProduct);
      await fetchProducts();
    } catch (e) {
      console.log("Add product error", e);
    }
  };

  const handleEdit = async (updatedProduct) => {
    try {
      await instance.put(`/${updatedProduct.id}`, updatedProduct);
      await fetchProducts();
    } catch (e) {
      console.log("Edit product error", e);
    }
  };

  const handleDetail = async (id) => {
    try {
      const response = await instance.get(`/${id}`);
      setSelectedProduct(response.data);
    } catch (e) {
      console.error("Fetch detail error", e);
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
