import { Router } from 'express'
import { resolver } from '../utils/resolver'
import { CompanyController } from '../api/controllers/company-controller'
import { InMemoryCompanyRepository } from '../api/persistence/repositories/in-memory/in-memory-company-repository'

const repository = new InMemoryCompanyRepository()
const controller = new CompanyController(repository)

export const CompanyRoutes = Router()

CompanyRoutes.get('/company/all', resolver(controller.findAllCompanies))
CompanyRoutes.get('/company/:id', resolver(controller.findCompanyById))
// CompanyRoutes.post('/company/create', resolver(createCompany))
// CompanyRoutes.put('/company/update/:id', resolver(updateCompany))