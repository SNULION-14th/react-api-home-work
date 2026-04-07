import { instance } from "../axios";

export const deleteProducts = async (id) => {
  try {
    const deleteProductsResponse = await instance.delete(
      `http://localhost:3000/products/${id}`,
    );
    return deleteProductsResponse.data;
  } catch (e) {
    throw new Error("Products 삭제 에러", e);
  }
};
