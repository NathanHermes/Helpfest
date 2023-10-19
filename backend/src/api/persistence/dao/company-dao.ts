import { randomUUID } from 'crypto'
import { Company } from '../../domain/entities/Company/company'
import { DAO } from '../../utils/DAO'

export class CompanyDao implements DAO<Company, string> {
  private companies: Array<Company> = new Array<Company>

  findAll (): Array<Company> {
    return this.companies
  }
  async findOne (uuid: string): Promise<Company | undefined> {
    const company = this.companies.find(company => company._id === uuid)

    return company
  }
  async create (company: Company): Promise<string> {
    company._id = randomUUID()
    const companyIndex = this.companies.push(company)

    return this.companies[companyIndex - 1]._id || ''
  }

  update (key: string, type: Company): Promise<string> {
    throw new Error('Method not implemented.')
  }
  deleteByKey (key: string): Promise<Company> {
    throw new Error('Method not implemented.')
  }
  delete (type: Company): Promise<Company> {
    throw new Error('Method not implemented.')
  }
}