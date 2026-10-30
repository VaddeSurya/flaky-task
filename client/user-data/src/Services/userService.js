
import axios from "axios";

const API_URL = "http://localhost:7676";

export const saveUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};
