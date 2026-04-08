import { instance } from "../axios";

export const getProducts = async () => {
  try {
    const getProductsResponse = await instance.get("/products");
    return getProductsResponse.data;
  } catch (e) {
    throw new Error("[ERROR] GET /products", e);
  }
};
