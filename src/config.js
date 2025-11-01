// src/config.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const endpoints = {
  properties: `${BASE_URL}/properties/`,
  lands: `${BASE_URL}/Lands/`,
  shortlet: `${BASE_URL}/shortlet/`,
  buy: `${BASE_URL}/buy/`,
  rent: `${BASE_URL}/rent/`,
};
