export interface CompanyProps {
  id?: string
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

  constructor (props: object) {
    if (props instanceof Company)
      this.props = props
    else
      this.props = {
        name: '', email: '', CNPJ: '', phone: '', address: '', number: '', city: '', uf: '', complement: '', secret: ''
      }
  }

  get id () {
    return this.props.id
  }

  get name () {
    return this.props.name
  }

  set name (name: string) {
    this.props.name = name
  }

  get email () {
    return this.props.email
  }

  set email (email: string) {
    this.props.email = email
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