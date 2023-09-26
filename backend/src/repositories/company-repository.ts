import { Company } from '../api/entities/Company/company'

export interface CompanyRepository {
  create (company: Company): Promise<number>;
}