import axios from "axios";

const API =  axios.create({
    baseURL: "http://localhost:8080/api/",
    responseType: "json"
});

API.interceptors.request.use(function (config) {
    const token = localStorage.getItem('currentUser')
        ? JSON.parse(localStorage.getItem('currentUser')).token
        : '';
    console.log('auto', token);
    config.headers.Authorization =  token !== '' ? `Bearer_${token}` : '';
    return config;
});

export default API;