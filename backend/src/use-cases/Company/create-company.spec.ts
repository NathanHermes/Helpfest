import { describe, expect, it } from 'vitest'
import { CreateCompany, CreateCompanyRequest } from './create-company'
import { Company } from '../../entities/Company/company'
import { InMemoryCompanyRepository } from '../../repositories/in-memory/in-memory-company-repository'

const companyRepository = new InMemoryCompanyRepository()
const createCompany = new CreateCompany(companyRepository)

describe('Create company', () => {
  it('should be able to create a company', () => {
    const company: CreateCompanyRequest = {
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
    }

    expect(createCompany.execute(company)).resolves.toBeInstanceOf(Company)
  })

  describe('Company name validation', () => {
    const company: CreateCompanyRequest = {
      name: '', email: '', CNPJ: '', phone: '', address: '', number: '', city: '', uf: '', complement: '', secret: ''
    }

    it('should not be able to create a company with null name', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
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

    it('should not be able to create a company with name length of three characters', () => {
      company.name = 'abc'
      expect(createCompany.execute(company)).rejects.toThrowError('Invalid company name length')
    })
  })

  describe('Company email validation', () => {
    const company: CreateCompanyRequest = {
      name: 'Oasis Eventos', email: '', CNPJ: '', phone: '', address: '', number: '', city: '', uf: '', complement: '', secret: ''
    }

    it('should not be able to create a company with null email', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      company.email = null
      expect(createCompany.execute(company)).rejects.toThrowError('Invalid company email')
    })

    it('should not be able to create a company with blank email', () => {
      company.email = ''
      expect(createCompany.execute(company)).rejects.toThrowError('Invalid company email')
    })
  })
})