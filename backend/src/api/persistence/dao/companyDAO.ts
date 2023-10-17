import { Company } from '../../domain/entities/Company/company'
import { DAO } from '../../utils/DAO'

export interface CompanyDao extends DAO<Company, string> { }