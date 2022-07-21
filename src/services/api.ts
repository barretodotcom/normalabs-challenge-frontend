import axios from 'axios'

export const API_URL = "https://normalabs-challenge-backend-01.herokuapp.com"

export const api = axios.create({
    baseURL: "https://normalabs-challenge-backend-01.herokuapp.com"
})