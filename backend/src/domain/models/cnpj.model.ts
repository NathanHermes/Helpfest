export class Cnpj {
  static #errors: string[] = []

  public static isValid( cnpj: string ): boolean {
    const digits: string = cnpj.replace( /[^0-9]/g, '' )

    if ( digits.length === 0 ) {
      this.#errors.push( 'CNPJ is blank' )
    } else if ( digits.length !== 14 ) {
      this.#errors.push( 'CNPJ length is shorter than fourteen characters' )
    } else {
      const arrCNPJ: number[] = Array.from( digits, Number )

      const repeatedNumbers: boolean = arrCNPJ.every( ( num, i, arr ) => num === arr[ 0 ] )
      if ( repeatedNumbers ) {
        this.#errors.push( 'CNPJ is invalid' )
      }

      const firstDigit = this.validateDigit( arrCNPJ, 1 )
      const secondDigit = this.validateDigit( arrCNPJ, 2 )
      if ( !firstDigit || !secondDigit ) {
        this.#errors.push( 'CNPJ is invalid' )
      }
    }

    return this.#errors.length === 0
  }

  private static validateDigit = ( arr: number[], position: number ): boolean => {
    let weights: number[]
    let arrayItems: number
    let sum = 0

    if ( position === 1 ) {
      weights = [ 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ]
      arrayItems = 12
    } else {
      weights = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ]
      arrayItems = 13
    }

    for ( let i = 0; i < arrayItems; i += 1 ) {
      const calc = weights[ i ] * arr[ i ]
      sum += calc
    }

    const division = Math.floor( sum % 11 )
    let verifyingDigit = 0

    if ( division >= 2 ) {
      verifyingDigit = 11 - division
    }

    if ( arr[ arrayItems ] !== verifyingDigit ) {
      return false
    }

    return true
  }

  public static getErrors(): string[] {
    return this.#errors
  }
}