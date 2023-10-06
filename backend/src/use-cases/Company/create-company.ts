import { CompanyRepository } from '../../repositories/company-repository'
import { Company } from '../../entities/Company/company'

export interface CreateCompanyRequest {
  name: string
  email: string
  CNPJ: string
  phone: string
  address: string
  number?: string
  city: string
  uf: string
  complement?: string
  secret: string
}

type CreateCompanyResponse = Company
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

export class CreateCompany {
  constructor (
    private companyRepository: CompanyRepository
  ) { }

  async execute ({ name, email, CNPJ, phone, address, number, city, uf, complement, secret }: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    if (name === null || name.trim() === '') throw new Error('Invalid company name')
    if (name.length <= 3) throw new Error('Invalid company name length')

    if (email === null || email.trim() === '') throw new Error('Invalid company email')
    if (!emailRegex.test(email)) throw new Error('Invalid company email format')

    if (CNPJ === null || CNPJ === '') throw new Error('Invalid company CNPJ')

    const company = new Company({
      name,
      email,
      CNPJ,
      phone,
      address,
      number,
      city,
      uf,
      complement,
      secret
    })

    await this.companyRepository.create(company)

    return company
  }
}