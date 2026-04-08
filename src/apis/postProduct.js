import { instance } from "../axios";

export const postProduct = async (product) => {
  try {
    const postProductResponse = await instance.post("/products", product);
    return postProductResponse.data;
  } catch (e) {
    throw new Error(`[ERROR] POST /products ${product}`, e);
  }
};
