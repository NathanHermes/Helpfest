import { ICompany } from '@models/company.model'
import { CreateCompanyUseCase } from '@use-cases/company/create-company'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCompanyRepository } from '../../../../src/infra/repositories/in-memory-company-repository'

const companyRepository = new InMemoryCompanyRepository()
const createCompany = new CreateCompanyUseCase(companyRepository)

describe('Company', () => {
  let company: ICompany = {}

  beforeEach(async () => {
    company = {
      name: 'Oasis Eventos',
      email: 'oasis@email.com',
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

  it('should be able to create a company', async () => {
    await expect(createCompany.execute(company)).resolves.toBeTypeOf('string')
  })

  describe('name tests', () => {
    it('should not be able to create a company with undefined name', async () => {
      company.name = undefined
      await expect(createCompany.execute(company)).rejects.toThrowError('Name is undefined')
    })

    it('should not be able to create a company with blank name', async () => {
      company.name = ''
      await expect(createCompany.execute(company)).rejects.toThrowError('Name is blank')
    })

    it('should not be able to create a company with white space name', async () => {
      company.name = '   '
      await expect(createCompany.execute(company)).rejects.toThrowError('Name is blank')
    })

    it('should not be able to create a company with name length shorter than three characters', async () => {
      company.name = 'abc'
      await expect(createCompany.execute(company)).rejects.toThrowError('Name length is shorter than three characters')
    })
  })

  describe('email tests', () => {
    it('should not be able to create a company with undefined email', async () => {
      company.email = undefined
      await expect(createCompany.execute(company)).rejects.toThrowError('Email is undefined')
    })

    it('should not be able to create a company with blank email', async () => {
      company.email = ''
      await expect(createCompany.execute(company)).rejects.toThrowError('Email is blank')
    })

    it('should not be able to create a company with white space email', async () => {
      company.email = '   '
      await expect(createCompany.execute(company)).rejects.toThrowError('Email is blank')
    })

    it('should not be able to create a company with email without character @', async () => {
      company.email = 'oasis_gmail.com'
      await expect(createCompany.execute(company)).rejects.toThrowError('Email format is invalid')
    })

    it('should not be able to create a company with email without domain', async () => {
      company.email = 'oasis@'
      await expect(createCompany.execute(company)).rejects.toThrowError('Email format is invalid')
    })
  })

  describe('cnpj tests', () => {
    it('should not be able to create a company with undefined cnpj', async () => {
      company.cnpj = undefined
      await expect(createCompany.execute(company)).rejects.toThrowError('CNPJ is undefined')
    })

    it('should not be able to create a company with blank cnpj', async () => {
      company.cnpj = ''
      await expect(createCompany.execute(company)).rejects.toThrowError('CNPJ is blank')
    })

    it('should not be able to create a company with white space cnpj', async () => {
      company.cnpj = '   '
      await expect(createCompany.execute(company)).rejects.toThrowError('CNPJ is blank')
    })

    it('should not be able to create a company with cnpj length shorter than fourteen characters', async () => {
      company.cnpj = '1111111111111'
      await expect(createCompany.execute(company)).rejects.toThrowError('CNPJ length is shorter than fourteen characters')
    })

    it('should not be able to create a company with invalid cnpj', async () => {
      company.cnpj = '39.840.615/0001-62'
      await expect(createCompany.execute(company)).rejects.toThrowError('CNPJ is invalid')
    })
  })

  describe('phone tests', () => {
    it('should not be able to create a company with undefined phone number', async () => {
      company.phone = undefined
      await expect(createCompany.execute(company)).rejects.toThrowError('Phone number is undefined')
    })

    it('should not be able to create a company with blank phone number', async () => {
      company.phone = ''
      await expect(createCompany.execute(company)).rejects.toThrowError('Phone number is blank')
    })

  })
})
