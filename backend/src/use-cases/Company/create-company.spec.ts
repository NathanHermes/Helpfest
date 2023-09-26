import { describe, expect, it } from 'vitest'
import { CreateCompany } from './create-company'
import { Company } from '../../entities/Company/company'
import { InMemoryCompanyRepository } from '../../repositories/in-memory/in-memory-company-repository'

describe('Create company', () => {
  it('should be able to create a company', () => {
    const companyRepository = new InMemoryCompanyRepository()
    const createCompany = new CreateCompany(companyRepository)

    expect(createCompany.execute({
      name: 'Oasis Eventos',
      email: 'oasis@gmail.com',
      CNPJ: '56041364000174',
      phone: '1136861256',
      address: 'Rod. Washington Luís',
      number: '',
      city: 'São Carlos',
      uf: 'SP',
      complement: '',
      secret: 'test'
    })).resolves.toBeInstanceOf(Company)
  })
})