import axios, { formToJSON } from 'axios';

const API = axios.create({
  // baseURL: `http://13.213.63.196:1211/api/`
  baseURL: `http://localhost:1211/api/`
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }

  return req;
});

export default API;
