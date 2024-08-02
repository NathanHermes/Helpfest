import { Cnpj } from '@models/cnpj.model'
import { CompanyDTO } from '@models/company.model'
import { Notification } from '@use-cases/utils/notification'
import { Validator } from '@use-cases/utils/validator'

export class CompanyInputResquestValidator extends Validator<CompanyDTO> {
  readonly #EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  #notification: Notification = new Notification()

  public validate( { name, email, cnpj, phone, address, number, city, uf, complement, secret }: CompanyDTO ): Notification {
    if ( this.isUndefinedOrEmpty( name ) ) {
      this.#notification.addError( 'Name is undefined or empty' )
    } else if ( name.trim().length <= 3 ) {
      this.#notification.addError( 'Name length is shorter than three characters' )
    }

    if ( this.isUndefinedOrEmpty( email ) ) {
      this.#notification.addError( 'E-mail is undefined or empty' )
    } else if ( !email.trim().toLowerCase().match( this.#EMAIL_REGEX ) ) {
      this.#notification.addError( 'E-mail format is invalid' )
    }

    if ( this.isUndefinedOrEmpty( cnpj ) ) {
      this.#notification.addError( 'CNPJ is undefined or empty' )
    } else {
      if ( !Cnpj.isValid( cnpj ) ) {
        Cnpj.getErrors().map( ( error ) => { this.#notification.addError( error ) } )
      }
    }

    if ( this.isUndefinedOrEmpty( phone ) ) {
      this.#notification.addError( 'Phone number is undefined or empty' )
    } else if ( phone.replace( /[^0-9]/g, '' ).length > 11 ) {
      this.#notification.addError( 'Phone number length is shorter than eleven characters' )
    }

    if ( this.isUndefinedOrEmpty( address ) ) {
      this.#notification.addError( 'Address is undefined or empty' )
    } else if ( address.length < 3 ) {
      this.#notification.addError( 'Address is invalid' )
    }

    return this.#notification
  }
}