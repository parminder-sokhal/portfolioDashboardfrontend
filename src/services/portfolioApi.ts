import axios from "axios";

const API_BASE = "https://portfoliodashboardbackend.onrender.com/api";

export const fetchPortfolio = async () => {
  const res = await axios.get(`${API_BASE}/portfolio`);
  return res.data;
};
