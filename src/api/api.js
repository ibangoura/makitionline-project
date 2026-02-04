import axios from "axios";

export async function productsData() {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
}