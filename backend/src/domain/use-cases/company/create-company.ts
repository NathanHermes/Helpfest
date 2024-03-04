

import { Validator } from '../../../application/validation/validator'
import { Company, ICompany } from '../../models'

import { CompanyInputResquestValidator } from './company-input-request-validator'
import { CompanyRepository } from './company-repository'

export class CreateCompanyUseCase {
  constructor(
    private repository: CompanyRepository
  ) { }

  async execute(_company: ICompany): Promise<Company | undefined> {
    const validator: Validator<ICompany> = new CompanyInputResquestValidator()
    const notification = await validator.validate(_company)

    if (notification)
      throw new Error(notification)

    const company = new Company(_company)

    const company_uuid = await this.repository.create(company)

    const response = this.repository.findOne(company_uuid)

    return response
  }
}