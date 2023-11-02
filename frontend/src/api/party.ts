import { api } from './connection'

export interface PartyModel {
  uuid?: string
  name: string
  partyDate: string
  partyTime: string
  celebrities?: string
  observations?: string
  uuidCompany: string
}

export const getAllParties = async (token: string) => {
  return await api.get('/party/all', {
    headers: {
      Authorization: token
    }
  })
}