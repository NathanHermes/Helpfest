import { Company } from '../../../domain/entities/Company/company'
import { CompanyDao } from '../../dao/companyDAO'

export class InMemoryCompanyRepository implements CompanyDao {
  findAll (): Company[] {
    throw new Error('Method not implemented.')
  }
  findOne (key: string): Company | undefined {
    throw new Error('Method not implemented.')
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