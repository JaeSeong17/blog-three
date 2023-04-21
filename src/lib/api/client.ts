import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
});
client.defaults.withCredentials = true;

export default client;
