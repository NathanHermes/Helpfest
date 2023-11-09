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

export const createParty = async (token: string, party: PartyModel) => {
  return await api.post('/party/create', {
    ...party
  }, {
    headers: {
      Authorization: token
    }
  })
}

export const updateParty = async (token: string, party: PartyModel) => {
  return await api.put('/party/update', {
    ...party
  }, {
    headers: {
      Authorization: token
    }
  })
}

export const deleteParty = async (token: string, uuid: string) => {
  return await api.delete('/party/delete', {
    data: {
      uuid
    },
    headers: {
      Authorization: token
    }
  })
}