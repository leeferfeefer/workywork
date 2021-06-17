import axios from 'axios';
import { IP } from '@env';

const API_PORT = 8080;
const LOGGER_PORT = 3000;
const baseURL = `http://${IP}:`;

export const apiInstance = axios.create({
    baseURL: baseURL+API_PORT,
    timeout: 5000,
});

export const loggerInstance = axios.create({
    baseURL: baseURL+LOGGER_PORT,
    timeout: 5000,
});