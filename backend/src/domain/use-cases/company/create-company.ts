import { Company, ICompany } from '../../models'
import { CompanyInputResquestValidator } from '../../validation/company-input-request-validator'
import { Validator } from '../../validation/validator'
import { CompanyRepository } from './company-repository'

export class CreateCompanyUseCase {
  constructor(
    private repository: CompanyRepository
  ) { }

  execute(_company: ICompany): Promise<Company | string> {
    const validator: Validator<ICompany> = new CompanyInputResquestValidator()

    return new Promise((resolve, reject) => {
      if (!validator.validate(_company)) {
        reject(new Error(validator.getErrors().at(0)))
      } else {
        const company = new Company(_company)

        this.repository.create(company).then(() => { resolve(company) })
      }
    })
  }
}