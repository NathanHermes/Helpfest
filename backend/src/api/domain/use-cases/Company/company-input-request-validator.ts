import { CompanyArgs } from '../../entities/company'
import { Notification } from '../utils/validation/notification'
import { Validator } from '../utils/validation/validator'

export class CompanyInputResquestValidator implements Validator<CompanyArgs> {
  validate({ name, email, CNPJ, phone, address, number, city, uf, complement, secret }: CompanyArgs): Notification {
    const notification: Notification = new Notification()
    
    if (name === null)
      notification.addError('Name is null')
    if (name === undefined)
      notification.addError('Name is undefined')
    if (name === '')
      notification.addError('Name is blank')
    return notification
  }

}