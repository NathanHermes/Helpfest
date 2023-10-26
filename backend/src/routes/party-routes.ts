import { Router } from 'express'
import { resolver } from '../utils/resolver'
import { InMemoryPartyRepository } from '../api/persistence/repositories/in-memory/in-memory-party-repository'
import { PartyController } from '../api/controllers/party-controller'

const repository = new InMemoryPartyRepository()
const controller = new PartyController(repository)

export const PartyRoutes = Router()

PartyRoutes.get('/company/all', resolver(controller.findAllParties))
PartyRoutes.get('/company/:uuid', resolver(controller.findPartyById))
PartyRoutes.post('/company/create', resolver(controller.createParty))
PartyRoutes.put('/company/update', resolver(controller.updateParty))
PartyRoutes.delete('/company/delete', resolver(controller.deleteParty))