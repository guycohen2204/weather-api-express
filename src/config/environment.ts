import dotenv from 'dotenv';

dotenv.config();

export const API_KEY = process.env.API_KEY;
export const PORT = process.env.PORT || 3000;
export const ENDPOINT = 'https://api.weatherapi.com/v1';