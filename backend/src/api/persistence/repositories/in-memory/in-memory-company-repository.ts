import { Company } from '../../../domain/entities/Company/company'
import { CompanyDao } from '../../dao/companyDAO'
import { randomUUID } from 'node:crypto'


export class InMemoryCompanyRepository implements CompanyDao {
  private companies: Company[] = []

  findAll (): Company[] {
    return this.companies
  }

  findOne (key: string): Company | undefined {
    return this.companies.find(company => company.id === key)
  }

  async create (company: Company): Promise<string> {
    company.id = randomUUID()
    this.companies.push(company)
    return company.id
  }

  async update (companyID: string, company: Company): Promise<string> {
    this.companies[companyID] = company
    return companyID
  }

  async delete (company: Company): Promise<Company> {
    // this.companies.findIndex()
    return new Company({})
  }

  async deleteByKey (key: string): Promise<Company> {
    return new Company({})
  }
}