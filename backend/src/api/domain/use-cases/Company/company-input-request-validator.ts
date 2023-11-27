import { CompanyArgs } from '../../entities/company'
import { Validator } from '../utils/validation/validator'

export class CompanyInputResquestValidator implements Validator<CompanyArgs> {
  async validate({ name, email, CNPJ, phone, address, number, city, uf, complement, secret }: CompanyArgs): Promise<string | undefined> {
    if (name === null) return 'Name is null'
    if (name === undefined) return 'Name is undefined'
    if (name.trim() === '') return 'Name is blank'
    if (name.length <= 3) return 'Name length is invalid'

    if (email === null) return 'Email is null'
    if (email === undefined) return 'Email is undefined'
  }
}