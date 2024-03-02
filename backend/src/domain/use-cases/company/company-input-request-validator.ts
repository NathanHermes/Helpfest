
import { ICompany } from '../../domain/models/company'
import { Validator } from '../../modules/validator'

export class CompanyInputResquestValidator implements Validator<ICompany> {
  private EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

  async validate({ name, email, cnpj, phone, address, number, city, uf, complement, secret }: ICompany): Promise<string | undefined> {
    if (name === undefined) return 'Name is undefined'
    if (name.trim() === '') return 'Name is blank'
    if (name.length <= 3) return 'Name length is invalid'

    if (email === undefined) return 'Email is undefined'
    if (email.trim() === '') return 'Email is blank'
    if (!String(email).toLowerCase().match(this.EMAIL_REGEX)) return 'Email format is invalid'

    if (cnpj === undefined) return 'CNPJ is undefined'
    if (cnpj.trim() === '') return 'CNPJ is blank'
  }
}