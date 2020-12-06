import axios from "axios";

const API =  axios.create({
    baseURL: "http://localhost:8080/api/",
    responseType: "json"
});

export default API;