import { Company, CompanyDTO } from '@models/company.model'
import { Notification } from '@use-cases/utils/notification'
import { Validator } from '@use-cases/utils/validator'
import { CompanyInputResquestValidator } from './company-input-request-validator'
import { CompanyRepository } from './company-repository'

export class CreateCompanyUseCase {
  #repository: CompanyRepository

  constructor( data: CompanyRepository ) {
    this.#repository = data
  }

  execute( data: CompanyDTO ): Promise<Company> {
    const validator: Validator<CompanyDTO> = new CompanyInputResquestValidator()
    const notification: Notification = validator.validate( data )

    return new Promise( ( resolve, reject ) => {
      if ( notification.hasErros() ) {
        reject( new Error( notification.errorMessage() ) )
      }
      const company = new Company( data )

      this.#repository.create( company ).then( () => { resolve( company ) } )
    } )
  }
}