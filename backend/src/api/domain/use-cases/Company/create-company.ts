import { Company, CompanyArgs } from '../../entities/company'
import { CompanyRepository } from '../../use-cases/Company/company-repository'
import { Validator } from '../utils/validator'
import { CompanyInputResquestValidator } from './company-input-request-validator'

export class CreateCompanyUseCase {
  constructor(
    private repository: CompanyRepository
  ) { }

  async execute(_company: CompanyArgs): Promise<Company | undefined> {
    const validator: Validator<CompanyArgs> = new CompanyInputResquestValidator()
    const notification = await validator.validate(_company)

    if (notification)
      throw new Error(notification)

    const company = new Company(_company)

    const company_uuid = await this.repository.create(company)

    const response = this.repository.findOne(company_uuid)

    return response
  }
}