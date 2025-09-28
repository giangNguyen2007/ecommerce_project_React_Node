import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL
// const BASE_URL = "https://backend-ecommerce-rev2.onrender.com/api/"

export const adminRequest = axios.create({
    baseURL: BASE_URL,
    // headers: {token: `Bearer ${ADMIN_TOKEN}`}
})

export const baseRequest = axios.create({
    baseURL: BASE_URL
})