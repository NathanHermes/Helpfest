export type TCompany = {
  uuid?: string
  name: string
  email: string
  cnpj: string
  phone: string
  address: string
  number?: string
  city: string
  uf: string
  complement?: string
  secret: string
}

export class Company {
  #uuid?: string
  #name: string
  #email: string
  #cnpj: string
  #phone: string
  #address: string
  #number?: string
  #city: string
  #uf: string
  #complement?: string
  #secret: string

  constructor(data: TCompany) {
    this.#uuid = data.uuid
    this.#name = data.name
    this.#email = data.email
    this.#cnpj = data.cnpj
    this.#phone = data.phone
    this.#address = data.address
    this.#number = data.number
    this.#city = data.city
    this.#uf = data.uf
    this.#complement = data.complement
    this.#secret = data.secret
  }

  public get uuid(): string | undefined {
    return this.#uuid
  }

  public set uuid(_uuid: string) {
    this.#uuid = _uuid
  }

  get name(): string {
    return this.#name
  }

  get email(): string {
    return this.#email
  }

  get cnpj(): string {
    return this.#cnpj
  }

  get phone(): string {
    return this.#phone
  }

  get address(): string {
    return this.#address
  }

  get number(): string | undefined {
    return this.#number
  }

  get city(): string {
    return this.#city
  }

  get uf(): string {
    return this.#uf
  }

  get complement(): string | undefined {
    return this.#complement
  }

  get secret(): string {
    return this.#secret
  }
}