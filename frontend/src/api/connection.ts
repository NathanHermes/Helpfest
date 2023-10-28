import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://helpfest-backend.vercel.app/'
})