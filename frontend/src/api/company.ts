import { api } from './connection'

export interface LoginModel {
  email: string
  secret: string
}

export interface CompanyModel {
  uuid?: string
  name: string
  email: string
  CNPJ: string
  phone: string
  address: string
  number?: string
  city: string
  uf: string
  complement?: string
  secret: string
}

export const login = async (login: LoginModel) => {
  await api.post('/login', {
    ...login
  })
}

export const saveCompany = async (company: CompanyModel) => {
  await api.post('/company/create', {
    ...company
  })
}