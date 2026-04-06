import React, { useEffect, useState } from "react";
import axios from "axios";
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
    // TODO 1: GET /products API를 호출하고 products state를 업데이트
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("목록 불러오기 실패:", error);
    }
  };

  const handleDelete = async (id) => {
    // TODO 3: DELETE API를 호출하고 fetchProducts() 호출
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts(); // 삭제 후 목록 갱신
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  const handleAdd = async (newProduct) => {
    // TODO 4: POST API를 호출하고 fetchProducts() 호출
    try {
      await axios.post(API_URL, newProduct);
      fetchProducts(); // 추가 후 목록 갱신
    } catch (error) {
      console.error("추가 실패:", error);
    }
  };

  const handleEdit = async (updatedProduct) => {
    // TODO 5: PUT API를 호출하고 fetchProducts() 호출
    // 수정할 때는 어떤 데이터인지 알려주기 위해 id가 필요합니다.
    try {
      await axios.put(`${API_URL}/${updatedProduct.id}`, updatedProduct);
      fetchProducts(); // 수정 후 목록 갱신
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  const handleDetail = async (id) => {
    // TODO 2: GET /products/:id API를 호출하고 selectedProduct state를 업데이트
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("상세 조회 실패:", error);
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
          // TODO 6: ProductCard 컴포넌트를 적절히 호출하기
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
