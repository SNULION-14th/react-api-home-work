import { instance } from "../axios";

export const editProducts = async (updatedProduct) => {
  try {
    const editProductsResponse = await instance.put(
      `http://localhost:3000/products/${updatedProduct.id}`,
      updatedProduct,
    );
    return editProductsResponse.data;
  } catch (e) {
    throw new Error("Products 수정 error", e);
  }
};
