import { instance } from "../axios";
const API_URL = "http://localhost:3000/products";

export const getProducts = async () => {
  try {
    const apiResponse = await instance.get(API_URL);
    return apiResponse.data;
  } catch (e) {
    throw new Error("products 목록 불러오기 error", e);
  }
};
