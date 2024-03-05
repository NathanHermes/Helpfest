import { Company } from '../../models'

export interface CompanyRepository {
  findAll(): Array<Company>
  findOne(uuid: string): Promise<Company | undefined>
  findOneByEmail(email: string): Promise<Company | undefined>

  create(_company: Company): Promise<string>
  update(uuid: string, company: Company): Promise<string>
  delete(company: Company): Promise<Company>
}