import { CompanyDTO } from '@models/company.model'
import { CreateCompanyUseCase } from '@use-cases/company/create-company'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCompanyRepository } from '../../../../src/infra/repositories/in-memory-company-repository'

const companyRepository = new InMemoryCompanyRepository()
const createCompany = new CreateCompanyUseCase( companyRepository )

describe( 'Test cases of create a new Company', () => {
  let company: CompanyDTO

  beforeEach( async () => {
    company = {
      name: 'Oasis Eventos',
      email: 'oasis@email.com',
      cnpj: '76.767.806/0001-71',
      phone: '(11) 93686-1256',
      address: 'Rod. Washington Luís',
      number: '',
      city: 'São Carlos',
      uf: 'SP',
      complement: '',
      secret: 'test'
    }
  } )

  it( '#001: Should be able to create a new company without errors', async () => {
    await expect( createCompany.execute( company ) ).resolves.toBeTypeOf( 'object' )
  } )

  describe( 'Case tests to validate the name of company', () => {
    it( '#002: Should not be able to create a company with undefined name', async () => {
      //@ts-expect-error This is an intentionally error of undefined value
      company.name = undefined
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'Name is undefined or empty' )
    } )

    it( '#003: Should not be able to create a company with blank name', async () => {
      company.name = ''
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'Name is undefined or empty' )
    } )

    it( '#004: Should not be able to create a company with white space name', async () => {
      company.name = '   '
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'Name is undefined or empty' )
    } )

    it( '#005: Should not be able to create a company with name length shorter than three characters', async () => {
      company.name = 'abc'
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'Name length is shorter than three characters' )
    } )
  } )

  describe( 'Case tests to validate the e-mail of company', () => {
    it( '#006: Should not be able to create a company with undefined email', async () => {
      //@ts-expect-error This is an intentionally error of undefined value
      company.email = undefined
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'E-mail is undefined or empty' )
    } )

    it( '#007: Should not be able to create a company with blank email', async () => {
      company.email = ''
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'E-mail is undefined or empty' )
    } )

    it( '#008: Should not be able to create a company with white space email', async () => {
      company.email = '   '
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'E-mail is undefined or empty' )
    } )

    it( '#009: Should not be able to create a company with email without character @', async () => {
      company.email = 'oasis_gmail.com'
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'E-mail format is invalid' )
    } )

    it( '#010: Should not be able to create a company with email without domain', async () => {
      company.email = 'oasis@'
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'E-mail format is invalid' )
    } )
  } )

  describe( 'Case tests to validate the cnpj of company', () => {
    it( '#011: Should not be able to create a company with undefined cnpj', async () => {
      //@ts-expect-error This is an intentionally error of undefined value
      company.cnpj = undefined
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'CNPJ is undefined or empty' )
    } )

    it( '#012: Should not be able to create a company with blank cnpj', async () => {
      company.cnpj = ''
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'CNPJ is undefined or empty' )
    } )

    it( '#013: Should not be able to create a company with white space cnpj', async () => {
      company.cnpj = '   '
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'CNPJ is undefined or empty' )
    } )

    it( '#014: Should not be able to create a company with cnpj length shorter than fourteen characters', async () => {
      company.cnpj = '11.111.111/1111-111'
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'CNPJ length is shorter than fourteen characters' )
    } )

    it( '#015: Should not be able to create a company with invalid cnpj', async () => {
      company.cnpj = '39.840.615/0001-62'
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'CNPJ is invalid' )
    } )
  } )

  describe( 'Case tests to validate the phone of company', () => {
    it( '#016: Should not be able to create a company with undefined phone number', async () => {
      //@ts-expect-error This is an intentionally error of undefined value
      company.phone = undefined
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'Phone number is undefined or empty' )
    } )

    it( '#017: Should not be able to create a company with blank phone number', async () => {
      company.phone = ''
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'Phone number is undefined or empty' )
    } )

    it( '#018: Should not be able to create a company with white space phone number', async () => {
      company.phone = '   '
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'Phone number is undefined or empty' )
    } )

    it( '#019: Should not be able to create a company with phone number length shorter than eleven characters', async () => {
      company.phone = '(999) 99999-9999'
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'Phone number length is shorter than eleven characters' )
    } )
  } )

  describe( 'Case tests to validate the address of company', () => {
    it( '#020: Should not be able to create a company with undefined address', async () => {
      //@ts-expect-error This is an intentionally error of undefined value
      company.address = undefined
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'Address is undefined or empty' )
    } )

    it( '#021: Should not be able to create a company with blank address', async () => {
      company.address = ''
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'Address is undefined or empty' )
    } )

    it( '#022: Should not be able to create a company with white spaces address', async () => {
      company.address = '   '
      await expect( createCompany.execute( company ) ).rejects.toThrowError( 'Address is undefined or empty' )
    } )
  } )
} )
