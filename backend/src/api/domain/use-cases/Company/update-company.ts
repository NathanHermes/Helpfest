import { Company, CompanyArgs } from '../../entities/Company/company'
import { CompanyRepository } from './company-repository'

export class UpdateCompanyUseCase {
  constructor (
    private repository: CompanyRepository
  ) { }

  async execute ({ uuid, name, email, CNPJ, phone, address, number, city, uf, complement, secret }: CompanyArgs): Promise<string | undefined> {
    const company = new Company({
      uuid,
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

    const _uuid = await this.repository.update(uuid!, company)

    return _uuid
  }
}