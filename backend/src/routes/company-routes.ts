import { Router } from 'express'
import { CompanyController } from '../controllers/company.controller'
import { VerifyToken } from '../middlewares/verify-token'
import { InMemoryCompanyRepository } from '../repositories/in-memory-company-repository'
import { resolver } from './resolver'

const verifyToken = new VerifyToken()
const repository = new InMemoryCompanyRepository()
const controller = new CompanyController(repository)

export const CompanyRoutes = Router()

CompanyRoutes.post('/login', resolver(controller.login))
CompanyRoutes.post('/company/create', resolver(controller.createCompany))

CompanyRoutes.get('/company/all', resolver(controller.findAllCompanies))
CompanyRoutes.get('/company/by', resolver(verifyToken.execute), resolver(controller.findCompanyById))
CompanyRoutes.put('/company/update', resolver(verifyToken.execute), resolver(controller.updateCompany))
CompanyRoutes.delete('/company/delete', resolver(verifyToken.execute), resolver(controller.deleteCompany))