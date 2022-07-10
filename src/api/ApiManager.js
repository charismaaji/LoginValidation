import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'http://e956-103-137-83-205.ngrok.io/api',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;
