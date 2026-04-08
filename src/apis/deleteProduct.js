import { instance } from "../axios";

export const deleteProduct = async (id) => {
  try {
    const deleteProductResponse = await instance.delete(`/products/${id}`);
    return deleteProductResponse.data;
  } catch (e) {
    throw new Error(`[ERROR] DELETE /products/${id}`, e);
  }
};
