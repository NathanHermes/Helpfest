import { Router } from 'express'
import { resolver } from '../utils/resolver'
import { CompanyController } from '../api/controllers/company-controller'
import { InMemoryCompanyRepository } from '../api/persistence/repositories/in-memory/in-memory-company-repository'
import { VerifyToken } from '../api/middlewares/verify-token'

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