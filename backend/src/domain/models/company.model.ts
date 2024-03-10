import { Cnpj } from './cnpj.model'

export interface ICompany {
  uuid?: string
  name?: string
  email?: string
  cnpj?: string
  phone?: string
  address?: string
  number?: string
  city?: string
  uf?: string
  complement?: string
  secret?: string
}

export class Company {
  private uuid?: string
  private name: string
  private email: string
  private cnpj: Cnpj
  private phone: string
  private address: string
  private number?: string
  private city: string
  private uf: string
  private complement?: string
  private secret: string

  constructor(_company?: ICompany) {
    this.uuid = _company?.uuid
    this.name = _company?.name || ''
    this.email = _company?.email || ''
    this.cnpj = new Cnpj(_company?.cnpj || '')
    this.phone = _company?.phone || ''
    this.address = _company?.address || ''
    this.number = _company?.number
    this.city = _company?.city || ''
    this.uf = _company?.uf || ''
    this.complement = _company?.complement
    this.secret = _company?.secret || ''
  }

  public getUuid(): string | undefined {
    return this.uuid
  }

  public setUuid(_uuid: string) {
    this.uuid = _uuid
  }

  get _name(): string { return this.name }

  get _email(): string { return this.email }

  get _cnpj(): Cnpj { return this.cnpj }

  get _phone(): string { return this.phone }

  get _address(): string { return this.address }

  get _number(): string | undefined { return this.number }

  get _city(): string { return this.city }

  get _uf(): string { return this.uf }

  get _complement(): string | undefined { return this.complement }

  get _secret(): string { return this.secret }
}