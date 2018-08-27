import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.15.57' //mock url
});

export default instance;
