import { Company } from '../../entities/Company/company'
import { CompanyRepository } from '../company-repository'

export class InMemoryCompanyRepository implements CompanyRepository {
  private companies: Company[] = []

  async create (company: Company): Promise<number> {
    return this.companies.push(company)
  }
}