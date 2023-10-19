import { Company } from '../../entities/Company/company'
import { CompanyRepository } from './company-repository'

export class FindCompanyUseCase {
  constructor (private repository: CompanyRepository) { }

  findAll (): Array<Company> {
    return this.repository.findAll()
  }

  async findOne (uuid: string): Promise<Company | undefined> {
    const company = await this.repository.findOne(uuid)

    return company
  }
}