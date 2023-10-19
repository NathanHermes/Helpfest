import { Company } from '../../entities/Company/company'

export interface CompanyRepository {
  findAll (): Array<Company>
  findOne (uuid: string): Promise<Company | undefined>

  create (company: Company): Promise<string>
  update (uuid: string, company: Company): Promise<string>
  deleteByKey (uuid: string): Promise<Company>
  delete (company: Company): Promise<Company>
}