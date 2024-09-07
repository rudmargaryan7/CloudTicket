import axios, { AxiosRequestConfig } from "axios";
import { FilterQueryType, LoginPayload, UserPayload } from "./apiTypes";
import { InputsTypes } from "@/pages/Admin/Components/AdminNewTicket";

const API_URL = "http://localhost:5000";
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
export const registerUser = async (data: AxiosRequestConfig<UserPayload>) => {
  return axios.post(`${API_URL}/api/auth/register`, data);
};

export const authUser = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/api/auth/${token}`);
};

export const loginUser = (data: AxiosRequestConfig<LoginPayload>) => {
  return axios.post(`${API_URL}/api/auth/login`, data);
};

export const createTicket = (payload: InputsTypes) => {
  return axios.post(`${API_URL}/api/v1/create`, payload);
};

export const getAllTickets = () => {
  return axios.get(`${API_URL}/api/v1/active`);
};

export const getHistoryTickets = () => {
  return axios.get(`${API_URL}/api/v1/history`);
};

export const initMainPageTickets = (name: string) => {
  return axios.post(`${API_URL}/api/v1/init`, { name });
};

export const filterTickets = (params: FilterQueryType) => {
  return axios.post(`${API_URL}/api/v1/filter`, params);
};

export const likeTicket = (data: { id: string }) => {
  return axios.post(`${API_URL}/api/v1/like`, data);
};

export const disLike = (data: { id: string }) => {
  return axios.post(`${API_URL}/api/v1/dislike`, data);
};

export const getFavorits = () => {
  return axios.get(`${API_URL}/api/v1/favorits`);
};
