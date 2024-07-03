import { ICompany } from '@models/company.model'
import { CreateCompanyUseCase } from '@use-cases/company/create-company'
import { fail } from 'assert'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCompanyRepository } from '../../../../src/infra/repositories/in-memory-company-repository'

const companyRepository = new InMemoryCompanyRepository()
const createCompany = new CreateCompanyUseCase(companyRepository)

describe('Company', () => {
  let company: ICompany = {}

  beforeEach(async () => {
    company = {
      name: 'Oasis Eventos',
      email: 'oasis@gmail.com',
      cnpj: '76.767.806/0001-71',
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
    createCompany.execute(company).then((resolve) => {
      expect(resolve).toBeTypeOf('string')
    }).catch((error: Error) => {
      fail(error.message)
    })
  })

  describe('name tests', () => {
    it('should not be able to create a company with undefined name', () => {
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

    it('should not be able to create a company with name length shorter than three characters', () => {
      company.name = 'abc'
      expect(createCompany.execute(company)).rejects.toThrowError('Name length is shorter than three characters')
    })
  })

  describe('email tests', () => {
    it('should not be able to create a company with undefined email', () => {
      company.email = undefined
      expect(createCompany.execute(company)).rejects.toThrowError('Email is undefined')
    })

    it('should not be able to create a company with blank email', () => {
      company.email = ''
      expect(createCompany.execute(company)).rejects.toThrowError('Email is blank')
    })

    it('should not be able to create a company with white space email', () => {
      company.email = '   '
      expect(createCompany.execute(company)).rejects.toThrowError('Email is blank')
    })

    it('should not be able to create a company with email without character @', () => {
      company.email = 'oasis_gmail.com'
      expect(createCompany.execute(company)).rejects.toThrowError('Email format is invalid')
    })

    it('should not be able to create a company with email without domain', () => {
      company.email = 'oasis@'
      expect(createCompany.execute(company)).rejects.toThrowError('Email format is invalid')
    })
  })

  describe('cnpj tests', () => {
    it('should not be able to create a company with undefined cnpj', () => {
      company.cnpj = undefined
      expect(createCompany.execute(company)).rejects.toThrowError('CNPJ is undefined')
    })

    it('should not be able to create a company with blank cnpj', () => {
      company.cnpj = ''
      expect(createCompany.execute(company)).rejects.toThrowError('CNPJ is blank')
    })

    it('should not be able to create a company with white space cnpj', () => {
      company.cnpj = '   '
      expect(createCompany.execute(company)).rejects.toThrowError('CNPJ is blank')
    })

    it('should not be able to create a company with cnpj length shorter than fourteen characters', () => {
      company.cnpj = '1111111111111'
      expect(createCompany.execute(company)).rejects.toThrowError('CNPJ length is shorter than fourteen characters')
    })

    it('should not be able to create a company with invalid cnpj', () => {
      company.cnpj = '39.840.615/0001-62'
      expect(createCompany.execute(company)).rejects.toThrowError('CNPJ is invalid')
    })
  })

  describe('phone tests', () => {
    it('should not be able to create a company with undefined phone number', () => {
      company.phone = undefined
      expect(createCompany.execute(company)).rejects.toThrowError('Phone number is undefined')
    })

    it('should not be able to create a company with blank phone number', () => {
      company.phone = ''
      expect(createCompany.execute(company)).rejects.toThrowError('Phone number is blank')
    })

  })
})
