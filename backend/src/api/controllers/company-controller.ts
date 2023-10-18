import { Request, Response } from 'express'
import { HandlerFunction } from '../../utils/resolver'
import { FindCompanyUseCase } from '../domain/use-cases/Company/find-company-use-case'
import { CompanyRepository } from '../domain/use-cases/Company/company-repository'

export class CompanyController {
  private findCompanyUseCase: FindCompanyUseCase
  constructor (private repository: CompanyRepository) {
    this.findCompanyUseCase = new FindCompanyUseCase(this.repository)
  }


  findAllCompanies: HandlerFunction = async (request: Request, response: Response): Promise<Response | undefined> => {
    return response.status(200).json({
      'code': 200,
      'status': 'OK',
      'data': this.findCompanyUseCase.findAll()
    })
  }

  findCompanyById: HandlerFunction = async (request: Request, response: Response): Promise<Response | undefined> => {
    const { id: companyID } = request.params

    return response.status(200).json({
      'code': 200,
      'status': 'OK',
      'data': this.findCompanyUseCase.findOne(companyID) || 'Nenhum registro encontrado'
    })
  }

  createCompany: HandlerFunction = async (request: Request, response: Response): Promise<Response | undefined> => {
    const body = request.body

    return response.status(201).json({
      'code': 201,
      'status': 'OK',
      'data': await this.inMemoryCompanyRepository.create(body)
    })
  }

  updateCompany: HandlerFunction = async (request: Request, response: Response): Promise<Response | undefined> => {
    const { id: companyID } = request.params
    const body = request.body

    return response.status(201).json({
      'code': 201,
      'status': 'OK',
      'data': (await this.inMemoryCompanyRepository.update(companyID, body)).toString()
    })
  }

  deleteCompany: HandlerFunction = async (request: Request, response: Response): Promise<Response | undefined> => {

  }
}