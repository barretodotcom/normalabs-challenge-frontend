import axios from 'axios'

export const API_URL = "http://localhost:3000"

export const api = axios.create({
    baseURL: "http://localhost:3000"
})