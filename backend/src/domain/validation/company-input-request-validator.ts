import { Cnpj } from '@models/cnpj.model'
import { ICompany } from '@models/company.model'
import { IValidator } from '@validation/validator'

export class CompanyInputResquestValidator implements IValidator<ICompany> {
  private errors: string[] = []
  private readonly EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

  validate({ name, email, cnpj, phone, address, number, city, uf, complement, secret }: ICompany): boolean {
    if (name === undefined) this.errors.push('Name is undefined')
    else if (name.trim() === '') this.errors.push('Name is blank')
    else if (name.length <= 3) this.errors.push('Name length is shorter than three characters')

    if (email === undefined) this.errors.push('Email is undefined')
    else if (email.trim() === '') this.errors.push('Email is blank')
    else if (!String(email).toLowerCase().match(this.EMAIL_REGEX)) this.errors.push('Email format is invalid')

    const _cnpj = new Cnpj(cnpj)
    if (!_cnpj.isValid()) {
      _cnpj.getErros().map((error) => { this.errors.push(error) })
    }

    return this.errors.length === 0
  }

  getErrors(): string[] {
    return this.errors
  }
}