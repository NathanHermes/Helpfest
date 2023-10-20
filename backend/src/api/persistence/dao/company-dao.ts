import { randomUUID } from 'crypto'
import { Company } from '../../domain/entities/Company/company'
import { DAO } from '../../utils/DAO'

export class CompanyDao implements DAO<Company, string> {
  private companies: Array<Company> = new Array<Company>

  findAll (): Array<Company> {
    return this.companies
  }
  async findOne (uuid: string): Promise<Company | undefined> {
    const company = this.companies.find(company => company._uuid === uuid)

    return company
  }
  async create (company: Company): Promise<string> {
    company._uuid = randomUUID()
    const companyIndex = this.companies.push(company)

    return this.companies[companyIndex - 1]._uuid || ''
  }

  async update (uuid: string, company: Company): Promise<string> {
    this.companies = this.companies.map(_company => _company._uuid === uuid ? company : _company)

    return uuid
  }
  deleteByKey (key: string): Promise<Company> {
    throw new Error('Method not implemented.')
  }
  delete (type: Company): Promise<Company> {
    throw new Error('Method not implemented.')
  }
}