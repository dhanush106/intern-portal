import axios from 'axios';

const API_URL = 'https://intern-portal-livid.vercel.app/';

export const login = async (email) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email });
  return response.data;
};

export const signup = async (name, email) => {
  const response = await axios.post(`${API_URL}/auth/signup`, { name, email });
  return response.data;
};

export const getUserDashboard = async (userId) => {
  const response = await axios.get(`${API_URL}/dashboard/${userId}`);
  return response.data;
};

export const addDonation = async (userId, amount) => {
  const response = await axios.post(`${API_URL}/dashboard/${userId}/donate`, { amount });
  return response.data;
};

export const getLeaderboard = async () => {
  const response = await axios.get(`${API_URL}/leaderboard`);
  return response.data;
};