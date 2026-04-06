import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import { instance } from "../axios";

const API_URL = "http://localhost:3000/products";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // TODO: GET /products API를 호출하고 products state를 업데이트
    try {
      const productResponse = await instance.get("/products");
      setProducts(productResponse.data);
    } catch (e) {
      throw new Error("product 불러오기 실패");
    }
  };

  const handleDelete = async (id) => {
    // TODO: DELETE API를 호출하고 fetchProducts() 호출
    try {
      const deleteResponse = await instance.delete(`/products/${id}`);
      await fetchProducts();
      return deleteResponse.data;
    } catch (e) {
      throw new Error("삭제 에러", e);
    }
  };

  const handleAdd = async (newProduct) => {
    // TODO: POST API를 호출하고 fetchProducts() 호출
    try {
      const product = { newProduct };
      const createProductResponse = await instance.post(
        "/products",
        newProduct,
      );
      await fetchProducts();
      return createProductResponse.data;
    } catch (e) {
      throw new Error("product 생성 에러", e);
    }
  };

  const handleEdit = async (updatedProduct) => {
    // TODO: PUT API를 호출하고 fetchProducts() 호출
    const { id } = updatedProduct;
    try {
      const handleEditResponse = await instance.put(
        `/products/${id}`,
        updatedProduct,
      );
      await fetchProducts();
      return handleEditResponse.data;
    } catch (e) {
      throw new Error("product 수정 에러", e);
    }
  };

  const handleDetail = async (id) => {
    // TODO: GET /products/:id API를 호출하고 selectedProduct state를 업데이트
    try {
      const handleDetailResponse = await instance.get(`/products/${id}`);
      setSelectedProduct(handleDetailResponse.data);
    } catch (e) {
      throw new Error("디테일 호출 실패", e);
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
          // TODO: ProductCard 컴포넌트를 적절히 호출하기
          // Note that you should specify key, product, onDelete, onEdit, onDetail
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
