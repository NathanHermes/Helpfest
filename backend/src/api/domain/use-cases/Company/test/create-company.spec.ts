import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCompanyRepository } from '../../../../persistence/repositories/in-memory/in-memory-company-repository'
import { Company, CompanyArgs } from '../../../entities/company'
import { CreateCompanyUseCase } from '../create-company'

const companyRepository = new InMemoryCompanyRepository()
const createCompany = new CreateCompanyUseCase(companyRepository)

describe('Create company', () => {
  let company: CompanyArgs = {}

  beforeEach(async () => {
    company = {
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
  })

  it('should be able to create a company', () => {
    expect(createCompany.execute(company)).resolves.toBeInstanceOf(Company)
  })

  describe('Company name validation', () => {
    it ('should not be able to create a company with null name', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      company.name = null
      expect(createCompany.execute(company)).rejects.toThrowError('Name is null')
    })

    it ('should not be able to create a company with undefined name', () => {
      company.name = undefined
      expect(createCompany.execute(company)).rejects.toThrowError('Name is undefined')
    })

    it('should not be able to create a company with blank name', () => {
      company.name = ''
      expect(createCompany.execute(company)).rejects.toThrowError('Name is blank')
    })

    it('should not be able to create a company with white space name', () => {
      company.name = '   '
      expect(createCompany.execute(company)).rejects.toThrowError('Name is blank')
    })

    it('should not be able to create a company with name length of three characters', () => {
      company.name = 'abc'
      expect(createCompany.execute(company)).rejects.toThrowError('Name length is invalid')
    })
  })

  describe('Company email validation', () => {
    it('should not be able to create a company with null email', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      company.email = null
      expect(createCompany.execute(company)).rejects.toThrowError('Email is null')
    })

    it('should not be able to create a company with undefined email', () => {
      company.email = undefined
      expect(createCompany.execute(company)).rejects.toThrowError('Email is undefined')
    })

    it('should not be able to create a company with blank email', () => {
      company.email = ''
      expect(createCompany.execute(company)).rejects.toThrowError('Email is blank')
    })

    it('should not be able to create a company with white space name', () => {
      company.email = '   '
      expect(createCompany.execute(company)).rejects.toThrowError('Invalid company email')
    })

    it('should not be able to create a company with email without character @', () => {
      company.email = 'oasis_gmail.com'
      expect(createCompany.execute(company)).rejects.toThrowError('Invalid company email format')
    })

    it('should not be able to create company email without domain', () => {
      company.email = 'oasis@'
      expect(createCompany.execute(company)).rejects.toThrowError('Invalid company email format')
    })
  })

  describe('Company CNPJ validation', () => {
    it('should not be able to create a company with null CNPJ', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      company.CNPJ = null
      expect(createCompany.execute(company)).rejects.toThrowError('Invalid company CNPJ')
    })

    it('should not be able to create a company with blank CNPJ', () => {
      company.CNPJ = ''
      expect(createCompany.execute(company)).rejects.toThrowError('Invalid company CNPJ')
    })

    it('should not be able to create a company with white space CNPJ', () => {
      company.CNPJ = '   '
      expect(createCompany.execute(company)).rejects.toThrowError('Invalid company CNPJ')
    })
  })
})