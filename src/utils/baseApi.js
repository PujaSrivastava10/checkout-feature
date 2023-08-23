import axios from "axios";
import { API_ENDPOINT } from "../constants/apiConstants";

const api = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
        "Content-Type": "application/json",
    }
});

export default api;