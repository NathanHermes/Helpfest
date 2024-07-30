import { Cnpj } from '@models/cnpj.model'
import { CompanyDTO } from '@models/company.model'
import { Notification } from '@use-cases/utils/notification'
import { Validator } from '@use-cases/utils/validator'

export class CompanyInputResquestValidator extends Validator<CompanyDTO> {
  readonly #EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  #notification: Notification = new Notification()

  public validate( { name, email, cnpj, phone, address, number, city, uf, complement, secret }: CompanyDTO ): Notification {
    if ( name === undefined ) {
      this.#notification.addError( 'Name is undefined' )
    } else if ( name.trim() === '' ) {
      this.#notification.addError( 'Name is blank' )
    } else if ( name.trim().length <= 3 ) {
      this.#notification.addError( 'Name length is shorter than three characters' )
    }

    if ( email === undefined ) {
      this.#notification.addError( 'Email is undefined' )
    } else if ( email.trim() === '' ) {
      this.#notification.addError( 'Email is blank' )
    } else if ( !String( email.trim() ).toLowerCase().match( this.#EMAIL_REGEX ) ) {
      this.#notification.addError( 'Email format is invalid' )
    }

    if ( cnpj === undefined ) {
      this.#notification.addError( 'CNPJ is undefined' )
    } else {
      if ( !Cnpj.isValid( cnpj ) ) {
        Cnpj.getErrors().map( ( error ) => { this.#notification.addError( error ) } )
      }
    }

    if ( phone === undefined ) {
      this.#notification.addError( 'Phone number is undefined' )
    } else if ( phone.trim() === '' ) {
      this.#notification.addError( 'Phone number is blank' )
    }

    return this.#notification
  }
}