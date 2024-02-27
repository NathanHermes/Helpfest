import { Request, Response } from 'express'

import { PartyRepository } from '../api/domain/use-cases/Party/party-repository'

import { HandlerFunction } from '../routes/resolver'
import { CreatePartyUseCase } from '../api/domain/use-cases/Party/create-party'
import { DeletePartyUseCase } from '../api/domain/use-cases/Party/delete-party'
import { FindPartyUseCase } from '../api/domain/use-cases/Party/find-party'
import { UpdatePartyUseCase } from '../api/domain/use-cases/Party/update-party'

export class PartyController {
  private findPartyUseCase: FindPartyUseCase
  private createPartyUseCase: CreatePartyUseCase
  private updatePartyUseCase: UpdatePartyUseCase
  private deletePartyUseCase: DeletePartyUseCase

  constructor(private repository: PartyRepository) {
    this.findPartyUseCase = new FindPartyUseCase(this.repository)
    this.createPartyUseCase = new CreatePartyUseCase(this.repository)
    this.updatePartyUseCase = new UpdatePartyUseCase(this.repository)
    this.deletePartyUseCase = new DeletePartyUseCase(this.repository)
  }

  findAllParties: HandlerFunction = async (request: Request, response: Response): Promise<Response> => {
    return response.status(200).json({
      'code': 200,
      'status': 'OK',
      'data': this.findPartyUseCase.findAll()
    })
  }

  findPartyById: HandlerFunction = async (request: Request, response: Response): Promise<Response> => {
    const { uuid: partyID } = request.body

    const _response = await this.findPartyUseCase.findOne(partyID)

    return response.status(200).json({
      'code': 200,
      'status': 'OK',
      'data': _response || 'Nenhum registro encontrado'
    })
  }

  createParty: HandlerFunction = async (request: Request, response: Response): Promise<Response> => {
    const body = request.body

    const _response = await this.createPartyUseCase.execute(body)

    return response.status(201).json({
      'code': 201,
      'status': 'Created',
      'data': _response
    })
  }

  updateParty: HandlerFunction = async (request: Request, response: Response): Promise<Response> => {
    const body = request.body

    const _response = await this.updatePartyUseCase.execute(body)

    return response.status(200).json({
      'code': 200,
      'status': 'OK',
      'data': _response
    })
  }

  deleteParty: HandlerFunction = async (request: Request, response: Response): Promise<Response> => {
    const body = request.body

    const _response = await this.deletePartyUseCase.execute(body)

    return response.status(200).json({
      'code': 200,
      'status': 'OK',
      'data': _response
    })
  }
}