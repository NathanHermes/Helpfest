import { InternalServerError } from '../../../utils/InternalServerError'
import { Company } from '../../entities/Company/company'
import { CompanyRepository } from './company-repository'

export class FindCompanyUseCase {
  constructor (private repository: CompanyRepository) { }

  findAll (): Array<Company> {
    return this.repository.findAll()
  }

  findOne (uuid: string): Company | undefined {
    return this.repository.findOne(uuid)
  }
}