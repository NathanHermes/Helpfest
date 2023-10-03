import { describe, expect, it } from 'vitest'
import { CreateCompany } from './create-company'
import { Company } from '../../entities/Company/company'
import { InMemoryCompanyRepository } from '../../repositories/in-memory/in-memory-company-repository'

const companyRepository = new InMemoryCompanyRepository()
const createCompany = new CreateCompany(companyRepository)

describe('Create company', () => {
  it('should be able to create a company', () => {
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

  describe('Company name validation', () => {
    const company = new Company({
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
    })

    it('should not be able to create a company with null name', () => {
      company.name = null

      expect(createCompany.execute(company)).rejects.toThrowError('Invalid company name')
    })

    it('should not be able to create a company with blank name', () => {
      company.name = ''

      expect(createCompany.execute(company)).rejects.toThrowError('Invalid company name')
    })

    it('should not be able to create a company with white space name', () => {
      company.name = '   '
      expect(createCompany.execute(company)).rejects.toThrowError('Invalid company name')
    })
  })
})