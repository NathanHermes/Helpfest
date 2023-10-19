import { Company } from '../../../domain/entities/Company/company'
import { CompanyRepository } from '../../../domain/use-cases/Company/company-repository'
import { CompanyDao } from '../../dao/company-dao'

export class InMemoryCompanyRepository implements CompanyRepository {
  private dao: CompanyDao

  constructor () {
    this.dao = new CompanyDao()
  }

  findAll (): Array<Company> {
    return this.dao.findAll()
  }

  async findOne (uuid: string): Promise<Company | undefined> {
    const company = await this.dao.findOne(uuid)

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