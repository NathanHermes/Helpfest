import { Company } from '../../../domain/entities/Company/company'
import { CompanyRepository } from '../../../domain/use-cases/Company/company-repository'
import { CompanyDao } from '../../dao/companyDAO'

export class InMemoryCompanyRepository implements CompanyRepository {
  private dao: CompanyDao

  constructor () {
    this.dao = new CompanyDao()
  }

  findAll (): Array<Company> {
    return this.dao.findAll()
  }
  findOne (uuid: string): Company | undefined {
    return this.dao.findOne(uuid)
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