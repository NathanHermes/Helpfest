import { randomUUID } from 'crypto'
import { Company } from '../models/company'
import { DAO } from './DAO'

export class CompanyDao implements DAO<Company, string> {
  private companies: Array<Company> = new Array<Company>

  async create(company: Company): Promise<string> {
    company._uuid = randomUUID()
    this.companies.push(company)

    return company._uuid
  }

  findAll(): Array<Company> {
    return this.companies
  }

  async findOne(uuid: string): Promise<Company | undefined> {
    const company = this.companies.find(company => company._uuid === uuid)

    return company
  }

  async SelectByEmail(email: string): Promise<Company | undefined> {
    const company = this.companies.find(_company => _company._email === email)

    return company
  }

  async update(uuid: string, company: Company): Promise<string> {
    this.companies = this.companies.map(_company => _company._uuid === uuid ? company : _company)

    return uuid
  }

  async delete(company: Company): Promise<Company> {
    this.companies = this.companies.filter(_company => _company !== company)

    return company
  }
}