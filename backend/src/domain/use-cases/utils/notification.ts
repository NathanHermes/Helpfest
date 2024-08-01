export class Notification {
  #errors: Error[] = []

  public addError( message: string ): void {
    this.#errors.push( new Error( message ) )
  }

  public isCorrect(): boolean {
    return !this.hasErros()
  }

  public hasErros(): boolean {
    return this.#errors.length > 0
  }

  public errorMessage(): string {
    let errors: string = ''

    this.#errors.map( error => {
      if ( errors === '' ) errors = error.message
      else errors += ( ', ' + error.message )
    } )

    return errors
  }
}
