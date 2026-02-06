
const LOCAL_URL = "http://127.0.0.1:8000";
const PROD_URL = "https://housing-backend-new.onrender.com";

const BASE_URL = import.meta.env.DEV ? LOCAL_URL : PROD_URL;

export const endpoints = {
  properties: `${BASE_URL}/properties/`,
  lands: `${BASE_URL}/lands/`,
  shortlet: `${BASE_URL}/shortlet/`,
  buy: `${BASE_URL}/buy/`,
  rent: `${BASE_URL}/rent/`,
};
