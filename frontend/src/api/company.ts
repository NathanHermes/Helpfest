import { api } from './connection'

export interface LoginModel {
  email: string
  secret: string
}

export async function login (login: LoginModel) {
  await api.post('/login', {
    ...login
  })
}