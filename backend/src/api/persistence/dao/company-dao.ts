import { Company } from '../../domain/entities/Company/company'
import { DAO } from '../../utils/DAO'

export class CompanyDao implements DAO<Company, string> {
  private companies: Array<Company> = new Array<Company>

  findAll (): Array<Company> {
    return this.companies
  }
  async findOne (uuid: string): Promise<Company | undefined> {
    const company = this.companies.find(company => company.id === uuid)

    return company
  }
  create (type: Company): Promise<string> {
    throw new Error('Method not implemented.')
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