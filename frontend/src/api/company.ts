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
  return await api.post('/login', {
    ...login
  })
}

export const saveCompany = async (company: CompanyModel) => {
  return await api.post('/company/create', {
    ...company
  })
}

export const updateCompany = async (token: string, company: CompanyModel) => {
  return await api.put('/company/update', {
    ...company
  }, {
    headers: {
      Authorization: token
    }
  })
}