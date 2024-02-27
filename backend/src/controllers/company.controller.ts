import { Request, Response } from 'express'

import { HandlerFunction } from '../routes/resolver'
import { CompanyRepository } from '../service/Company/company-repository'
import { CreateCompanyUseCase } from '../service/Company/create-company'
import { DeleteCompanyUseCase } from '../service/Company/delete-company'
import { FindCompanyUseCase } from '../service/Company/find-company'
import { LoginUseCase } from '../service/Company/login-company'
import { UpdateCompanyUseCase } from '../service/Company/update-company'

export class CompanyController {
  private loginUseCase: LoginUseCase
  private findCompanyUseCase: FindCompanyUseCase
  private createCompanyUseCase: CreateCompanyUseCase
  private updateCompanyUseCase: UpdateCompanyUseCase
  private deleteCompanyUseCase: DeleteCompanyUseCase

  constructor(private repository: CompanyRepository) {
    this.loginUseCase = new LoginUseCase(this.repository)
    this.findCompanyUseCase = new FindCompanyUseCase(this.repository)
    this.createCompanyUseCase = new CreateCompanyUseCase(this.repository)
    this.updateCompanyUseCase = new UpdateCompanyUseCase(this.repository)
    this.deleteCompanyUseCase = new DeleteCompanyUseCase(this.repository)
  }

  login: HandlerFunction = async (request: Request, response: Response): Promise<Response> => {
    const { email, secret } = request.body

    const _response = await this.loginUseCase.execute(email, secret)

    return response.status(200).json({
      'code': 200,
      'status': 'OK',
      'data': _response,
      'expire-time': '4h'
    })
  }

  findAllCompanies: HandlerFunction = async (request: Request, response: Response): Promise<Response> => {
    return response.status(200).json({
      'code': 200,
      'status': 'OK',
      'data': this.findCompanyUseCase.findAll()
    })
  }

  findCompanyById: HandlerFunction = async (request: Request, response: Response): Promise<Response> => {
    const { uuid: companyID } = request.body

    const _response = await this.findCompanyUseCase.findOne(companyID)

    return response.status(200).json({
      'code': 200,
      'status': 'OK',
      'data': _response || 'Nenhum registro encontrado'
    })
  }

  createCompany: HandlerFunction = async (request: Request, response: Response): Promise<Response> => {
    const body = request.body

    const _response = await this.createCompanyUseCase.execute(body)

    return response.status(201).json({
      'code': 201,
      'status': 'Created',
      'data': _response
    })
  }

  updateCompany: HandlerFunction = async (request: Request, response: Response): Promise<Response> => {
    const body = request.body

    const _response = await this.updateCompanyUseCase.execute(body)

    return response.status(200).json({
      'code': 200,
      'status': 'OK',
      'data': _response
    })
  }

  deleteCompany: HandlerFunction = async (request: Request, response: Response): Promise<Response> => {
    const body = request.body

    const _response = await this.deleteCompanyUseCase.execute(body)

    return response.status(200).json({
      'code': 200,
      'status': 'OK',
      'data': _response
    })
  }
}