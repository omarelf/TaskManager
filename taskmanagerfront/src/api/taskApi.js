// src/api/tasksApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/task'; // Adjust this URL to match your backend endpoint

// Set up a pre-configured axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*" 
  },
});

// Include the auth token in the header of each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export const fetchTasks = async (page =1,limit =2) => {
  const response = await axiosInstance.get(`?page=${page}&limit=${limit}`);
  return response.data;
};

export const addTask = async (taskData) => {
  const response = await axiosInstance.post('/', taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await axiosInstance.put(`/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axiosInstance.delete(`/${id}`);
  return response.data;
};
