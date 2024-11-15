import Axios from 'axios';

const API = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
});

export default API;