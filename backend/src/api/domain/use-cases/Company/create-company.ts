import { Company, CompanyArgs } from '../../entities/company'
import { CompanyRepository } from '../../use-cases/Company/company-repository'
import { Notification } from '../utils/validation/notification'
import { Validator } from '../utils/validation/validator'
import { CompanyInputResquestValidator } from './company-input-request-validator'

const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

export class CreateCompanyUseCase {
  constructor(
    private repository: CompanyRepository
  ) { }

  async execute(_company: CompanyArgs): Promise<Company | undefined> {
    const validator: Validator<CompanyArgs> = new CompanyInputResquestValidator()
    const notification: Notification = validator.validate(_company)

    if (notification.hasErrors())
      throw new Error(notification.errorMessage())

    const company = new Company(_company)

    const company_uuid = await this.repository.create(company)

    const response = this.repository.findOne(company_uuid)

    return response
  }
}