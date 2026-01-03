import axios from "axios";

export const api = axios.create({
    baseURL: 'https://serverless.roboflow.com/infer/workflows/',
    headers: {
        "Content-Type": "application/json"
    }
});