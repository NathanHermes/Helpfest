import { Router } from 'express'

import { VerifyToken } from '../middlewares/verify-token'
import { resolver } from './resolver'

import { InMemoryCompanyRepository } from '../../infra/repositories/in-memory-company-repository'
import { CompanyController } from '../controllers/company.controller'

const repository = new InMemoryCompanyRepository()
const controller = new CompanyController(repository)

export const CompanyRoutes = Router()

CompanyRoutes.post('/login', resolver(controller.login))
CompanyRoutes.post('/company/create', resolver(controller.createCompany))

CompanyRoutes.get('/company/all', resolver(controller.findAllCompanies))
CompanyRoutes.get('/company/by', resolver(VerifyToken.execute), resolver(controller.findCompanyById))
CompanyRoutes.put('/company/update', resolver(VerifyToken.execute), resolver(controller.updateCompany))
CompanyRoutes.delete('/company/delete', resolver(VerifyToken.execute), resolver(controller.deleteCompany))