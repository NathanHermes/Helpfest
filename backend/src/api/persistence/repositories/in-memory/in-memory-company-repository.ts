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

  async create (company: Company): Promise<string> {
    const uuid = await this.dao.create(company)

    return uuid
  }

  async update (uuid: string, company: Company): Promise<string> {
    const _uuid = await this.dao.update(uuid, company)

    return _uuid
  }
  deleteByKey (key: string): Promise<Company> {
    throw new Error('Method not implemented.')
  }
  delete (type: Company): Promise<Company> {
    throw new Error('Method not implemented.')
  }
}