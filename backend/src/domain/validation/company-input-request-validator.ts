import { ICompany } from '../models'
import { Validator } from './validator'

export class CompanyInputResquestValidator implements Validator<ICompany> {
  private errors: string[] = []
  private readonly EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

  validate({ name, email, cnpj, phone, address, number, city, uf, complement, secret }: ICompany): boolean {
    if (name === undefined) this.errors.push('Name is undefined')
    else if (name.trim() === '') this.errors.push('Name is blank')
    else if (name.length <= 3) this.errors.push('Name length is invalid')

    if (email === undefined) this.errors.push('Email is undefined')
    else if (email.trim() === '') this.errors.push('Email is blank')
    else if (!String(email).toLowerCase().match(this.EMAIL_REGEX)) this.errors.push('Email format is invalid')

    if (cnpj === undefined) this.errors.push('cnpj is undefined')
    else if (cnpj.trim() === '') this.errors.push('cnpj is blank')

    return this.errors.length !== 0
  }

  getErrors(): string[] {
    return this.errors
  }
}