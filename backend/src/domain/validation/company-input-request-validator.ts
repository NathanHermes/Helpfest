import { Cnpj } from '@models/cnpj.model'
import { ICompany } from '@models/company.model'
import { IValidator } from '@validation/validator'

export class CompanyInputResquestValidator implements IValidator<ICompany> {
  private errors: string[] = []
  private readonly EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

  validate({ name, email, cnpj, phone, address, number, city, uf, complement, secret }: ICompany): boolean {
    if (name === undefined) {
      this.errors.push('Name is undefined')
    } else if (name.trim() === '') {
      this.errors.push('Name is blank')
    } else if (name.trim().length <= 3) {
      this.errors.push('Name length is shorter than three characters')
    }

    if (email === undefined) {
      this.errors.push('Email is undefined')
    } else if (email.trim() === '') {
      this.errors.push('Email is blank')
    } else if (!String(email.trim()).toLowerCase().match(this.EMAIL_REGEX)) {
      this.errors.push('Email format is invalid')
    }

    if (cnpj === undefined) {
      this.errors.push('CNPJ is undefined')
    } else {
      const _cnpj = new Cnpj(cnpj)
      if (!_cnpj.isValid()) {
        _cnpj.getErrors().map((error) => { this.errors.push(error) })
      }
    }

    if (phone === undefined) {
      this.errors.push('Phone number is undefined')
    } else if (phone.trim() === '') {
      this.errors.push('Phone number is blank')
    }

    return this.errors.length === 0
  }

  getErrors(): string[] {
    return this.errors
  }
}