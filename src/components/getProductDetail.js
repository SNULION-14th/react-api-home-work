import { instance } from "../axios";

export const getProductDetail = async (id) => {
  try {
    const response = await instance.get(`http://localhost:3000/products/${id}`);
    return response.data;
  } catch (e) {
    throw new Error("Product 정보 불러오기 error", e);
  }
};
