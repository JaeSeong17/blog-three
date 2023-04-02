import axios from 'axios';

const client = axios.create({
  baseURL:
    'https://port-0-blog-three-backend-p8xrq2mlfy7lm82.sel3.cloudtype.app/',
  timeout: 5000,
});
client.defaults.withCredentials = true;

export default client;
