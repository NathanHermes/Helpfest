import { Company, CompanyArgs } from '../../entities/company'
import { CompanyRepository } from './company-repository'

export class DeleteCompanyUseCase {
  constructor (
    private repository: CompanyRepository
  ) { }

  async execute ({ uuid }: CompanyArgs): Promise<Company | undefined> {
    const company = await this.repository.findOne(uuid!)

    const result = await this.repository.delete(company!)

    return result
  }
}