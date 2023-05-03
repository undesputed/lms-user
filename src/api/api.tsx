import axios, { formToJSON } from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api/' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }

  return req;
});

// Normal Authentication
export const login = (formData: any) => API.post('auth/login', formData);
export const register = (formData: any) => API.post('auth/register', formData);
// Google Authentication
export const googleAuth = (formData: any) =>
  API.post('auth/google/login', formData);
export const googleUserRegistration = (formData: any) =>
  API.post('auth/google/register', formData);
export const googleRegistration = (formData: any) =>
  API.post('auth/google/googleRegister', formData);
// Receptionist Authentication
export const receptionistAuth = (formData: any) =>
  API.post('auth/receptionist/login', formData);
export const receptionistRegister = (formData: any) =>
  API.post('auth/receptionist/register', formData);

// Category
export const category = () => API.get('category');

// SubCategory
export const subCategory = () => API.get(`subCategory`);
