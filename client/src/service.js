import axios from "axios";

const API_URL = "http://localhost:5000";

export const Addproduct = async (product) => {
  const response = await axios.post('${API_URL}/get_product',product);
  return response.data;
};

