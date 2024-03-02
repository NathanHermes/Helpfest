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
  constructor(
    private name: string,
    private email: string,
    private cnpj: string,
    private phone: string,
    private address: string,
    private city: string,
    private uf: string,
    private secret: string,
    private number?: string,
    private complement?: string,
    private uuid?: string,
  ) { }

  // constructor(private _company?: ICompany) {
  //   // if (_company === undefined) {

  //   // }
  //   // this.uuid = _company.uuid
  //   // this.name = args?.name || ''
  //   // this.email = args?.email || ''
  //   // this.cnpj = args?.CNPJ || ''
  //   // this.phone = args?.phone || ''
  //   // this.address = args?.address || ''
  //   // this.number = args?.number
  //   // this.city = args?.city || ''
  //   // this.uf = args?.uf || ''
  //   // this.complement = args?.complement
  //   // this.secret = args?.secret || ''
  // }

  get _uuid(): string | undefined {
    return this.uuid
  }

  set _uuid(uuid: string) {
    this.uuid = uuid
  }

  get _name(): string {
    return this.name
  }

  set _name(name: string) {
    this.name = name
  }

  get _email() {
    return this.email
  }

  set _email(email: string) {
    this.email = email
  }

  get _CNPJ() {
    return this.cnpj
  }

  get _phone() {
    return this.phone
  }

  get _address() {
    return this.address
  }

  get _number() {
    return this.number
  }

  get _city() {
    return this.city
  }

  get _uf() {
    return this.uf
  }

  get _complement() {
    return this.complement
  }

  get _secret() {
    return this.secret
  }

  Equal = () => {

  }
}