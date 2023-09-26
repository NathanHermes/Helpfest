import { Company } from '../entities/Company/company'

export interface CompanyRepository {
  create (company: Company): Promise<number>;
}