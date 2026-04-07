import { instance } from "../axios";

export const createProducts = async (productData) => {
  try {
    const createProductsResponse = await instance.post(
      `http://localhost:3000/products`,
      productData,
    );
    return createProductsResponse.data;
  } catch (e) {
    throw new Error("Products 생성 에러", e);
  }
};
