export interface CompanyProps {
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

export class Company {
  private props: CompanyProps

  constructor (props: CompanyProps) {
    this.props = props
  }

  get name () {
    return this.props.name
  }

  get email () {
    return this.props.email
  }

  get CNPJ () {
    return this.props.CNPJ
  }

  get phone () {
    return this.props.phone
  }

  get address () {
    return this.props.address
  }

  get number () {
    return this.props.number
  }

  get city () {
    return this.props.city
  }

  get uf () {
    return this.props.uf
  }

  get complement () {
    return this.props.complement
  }

  get secret () {
    return this.props.secret
  }
}