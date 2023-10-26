import { Router } from 'express'
import { resolver } from '../utils/resolver'
import { InMemoryPartyRepository } from '../api/persistence/repositories/in-memory/in-memory-party-repository'
import { PartyController } from '../api/controllers/party-controller'

const repository = new InMemoryPartyRepository()
const controller = new PartyController(repository)

export const PartyRoutes = Router()

PartyRoutes.get('/party/all', resolver(controller.findAllParties))
PartyRoutes.get('/party/by', resolver(controller.findPartyById))
PartyRoutes.post('/party/create', resolver(controller.createParty))
PartyRoutes.put('/party/update', resolver(controller.updateParty))
PartyRoutes.delete('/party/delete', resolver(controller.deleteParty))