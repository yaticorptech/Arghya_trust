import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const apiSecret = import.meta.env.VITE_API_SECRET;


export const adminLogin = async (cardNumber, password) => {


  const response = await axios.post(`${baseURL}/login`, {
    CardNumber: cardNumber,
    password: password
  }, {
    headers: {
      'x-api-key': apiKey,
      'x-api-secret': apiSecret,
      'Content-Type': 'application/json',
    }
  });



  return response;
};