import { instance } from "../axios";

export const getProductById = async (id) => {
  try {
    const getProductByIdResponse = await instance.get(`/products/${id}`);
    return getProductByIdResponse.data;
  } catch (e) {
    throw new Error(`[ERROR] GET /products/${id}`, e);
  }
};
