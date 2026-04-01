import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

const API_URL = "http://localhost:3000/products";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // TODO: GET /products API를 호출하고 products state를 업데이트
  };

  const handleDelete = async (id) => {
    // TODO: DELETE API를 호출하고 fetchProducts() 호출
  };

  const handleAdd = async (newProduct) => {
    // TODO: POST API를 호출하고 fetchProducts() 호출
  };

  const handleEdit = async (updatedProduct) => {
    // TODO: PUT API를 호출하고 fetchProducts() 호출
  };

  const handleDetail = async (id) => {
    // TODO: GET /products/:id API를 호출하고 selectedProduct state를 업데이트
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
            <p className="text-gray-500 text-sm mb-1">{selectedProduct.category}</p>
            <p className="text-lg font-semibold mb-2">${selectedProduct.price}</p>
            <p className="text-sm mb-3">{selectedProduct.description}</p>
            <p className="text-sm text-yellow-500">
              ⭐ {selectedProduct.rating?.rate} ({selectedProduct.rating?.count}개 리뷰)
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
          // TODO: ProductCard 컴포넌트를 적절히 호출하기
          // Note that you should specify key, product, onDelete, onEdit, onDetail
          <></>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
