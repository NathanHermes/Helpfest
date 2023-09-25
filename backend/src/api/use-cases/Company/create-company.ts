import { Company } from '../../entities/Company/company'

interface CreateCompanyRequest {
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

export class CreateCompany {
  async execute ({ name, email, CNPJ, phone, address, number, city, uf, complement, secret }: CreateCompanyRequest): Promise<CreateCompanyResponse> {
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

    return company
  }
}