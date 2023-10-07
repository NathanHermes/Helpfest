import { Company } from '../domain/entities/Company/company'

export interface CompanyRepository {
  create (company: Company): Promise<number>;
}