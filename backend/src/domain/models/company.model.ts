export interface ICompany {
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
  private name: string
  private email: string
  private cnpj: string
  private phone: string
  private address: string
  private city: string
  private uf: string
  private secret: string
  private number?: string
  private complement?: string
  private uuid?: string

  constructor(_company?: ICompany) {
    this.uuid = _company?.uuid
    this.name = _company?.name || ''
    this.email = _company?.email || ''
    this.cnpj = _company?.cnpj || ''
    this.phone = _company?.phone || ''
    this.address = _company?.address || ''
    this.number = _company?.number
    this.city = _company?.city || ''
    this.uf = _company?.uf || ''
    this.complement = _company?.complement
    this.secret = _company?.secret || ''
  }

  get _uuid(): string | undefined { return this.uuid }

  get _name(): string { return this.name }

  get _email() { return this.email }

  get _cnpj() { return this.cnpj }

  get _phone() { return this.phone }

  get _address() { return this.address }

  get _number() { return this.number }

  get _city() { return this.city }

  get _uf() { return this.uf }

  get _complement() { return this.complement }

  get _secret() { return this.secret }
}