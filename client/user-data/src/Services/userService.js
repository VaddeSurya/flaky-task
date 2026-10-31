
import axios from "axios";

const API_URL = "http://localhost:7676";

export const saveUser = async (user) => {
  const response = await axios.post(API_URL, {
    user_id: user.id,
    name: user.name,
    email: user.email,
  });
  return response.data;
};