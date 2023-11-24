import { Company, CompanyArgs } from '../../entities/company'
import { CompanyRepository } from '../../use-cases/company/company-repository'

const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

export class CreateCompanyUseCase {
  constructor(
    private repository: CompanyRepository
  ) { }

  async execute({ name, email, CNPJ, phone, address, number, city, uf, complement, secret }: CompanyArgs): Promise<string | undefined> {
    if (name === null || name.trim() === '') throw new Error('Invalid company name')
    if (name.length <= 3) throw new Error('Invalid company name length')

    if (email === null || email.trim() === '') throw new Error('Invalid company email')
    if (!emailRegex.test(email)) throw new Error('Invalid company email format')

    if (CNPJ === null || CNPJ.trim() === '') throw new Error('Invalid company CNPJ')

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

    const uuid = await this.repository.create(company)

    return uuid
  }
}