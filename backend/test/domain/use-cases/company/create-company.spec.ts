import { beforeEach, describe, expect, it } from 'vitest'
import { Company, ICompany } from '../../../../src/domain/models'
import { CreateCompanyUseCase } from '../../../../src/domain/use-cases/company/create-company'
import { InMemoryCompanyRepository } from '../../../../src/infra/repositories/in-memory-company-repository'

const companyRepository = new InMemoryCompanyRepository()
const createCompany = new CreateCompanyUseCase(companyRepository)

describe('Create company', () => {
  let company: ICompany = {}

  beforeEach(async () => {
    company = {
      name: 'Oasis Eventos',
      email: 'oasis@gmail.com',
      cnpj: '56041364000174',
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
      expect(resolve).toBeInstanceOf(Company)
    })
  })

  describe('should not be able to create a company with', () => {
    describe('name validation', () => {
      it('undefined name', () => {
        company.name = undefined
        expect(createCompany.execute(company)).rejects.toThrowError('Name is undefined')
      })

      it('blank name', () => {
        company.name = ''
        expect(createCompany.execute(company)).rejects.toThrowError('Name is blank')
      })

      it('white space name', () => {
        company.name = '   '
        expect(createCompany.execute(company)).rejects.toThrowError('Name is blank')
      })

      it('name length of three characters', () => {
        company.name = 'abc'
        expect(createCompany.execute(company)).rejects.toThrowError('Name length is invalid')
      })
    })

    describe('email validation', () => {
      it('undefined email', () => {
        company.email = undefined
        expect(createCompany.execute(company)).rejects.toThrowError('Email is undefined')
      })

      it('blank email', () => {
        company.email = ''
        expect(createCompany.execute(company)).rejects.toThrowError('Email is blank')
      })

      it('white space email', () => {
        company.email = '   '
        expect(createCompany.execute(company)).rejects.toThrowError('Email is blank')
      })

      it('email without character @', () => {
        company.email = 'oasis_gmail.com'
        expect(createCompany.execute(company)).rejects.toThrowError('Email format is invalid')
      })

      it('email without domain', () => {
        company.email = 'oasis@'
        expect(createCompany.execute(company)).rejects.toThrowError('Email format is invalid')
      })
    })

    describe('cnpj validation', () => {
      it('undefined cnpj', () => {
        company.cnpj = undefined
        expect(createCompany.execute(company)).rejects.toThrowError('cnpj is undefined')
      })

      it('blank cnpj', () => {
        company.cnpj = ''
        expect(createCompany.execute(company)).rejects.toThrowError('cnpj is blank')
      })

      it('white space email', () => {
        company.cnpj = '  '
        expect(createCompany.execute(company)).rejects.toThrowError('cnpj is blank')
      })

      it('')
    })
  })
})