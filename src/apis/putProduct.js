import { instance } from "../axios";

export const putProduct = async (product) => {
  try {
    const putProductResponse = await instance.put(
      `/products/${product.id}`,
      product,
    );
    return putProductResponse.data;
  } catch (e) {
    throw new Error(`[ERROR] PUT /products/${id} ${product}`, e);
  }
};
