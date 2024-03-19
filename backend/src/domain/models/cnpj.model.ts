export class Cnpj {
  private readonly regex: RegExp = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/
  private readonly invalidCnpjs: string[] = [
    '11111111111111'
  ]
  private errors: string[] = []

  constructor(private readonly cnpj: string | undefined) { }

  public isValid(): boolean {
    if (this.cnpj === undefined) {
      this.errors.push('Cnpj is undefined')
    } else if (this.cnpj.trim().length === 0) {
      this.errors.push('Cnpj is blank')
    } else if (this.cnpj.trim().length <= 13) {
      this.errors.push('Cnpj length is shorter than fourteen characters')
    } else if (this.cnpj.trim().length >= 19) {
      this.errors.push('Cnpj length is longer than eighteen characters')
    } else {
      const digits: string = this.cnpj.replace(/[^0-9]/g, '')
      const firstSum: number = this.calculateSum(digits, 5)
      const secondSum: number = this.calculateSum(digits, 6)

      const firstDigit: number = (firstSum % 11) < 2 ? 0 : 11 - (firstSum % 11)
      const secondDigit: number = (secondSum % 11) < 2 ? 0 : 11 - (secondSum % 11)
      const isValid: boolean = firstDigit === parseInt(digits.charAt(12)) && secondDigit === parseInt(digits.charAt(13))

      console.log(isValid, ' - ', this.invalidCnpjs.includes(digits))

      if (this.invalidCnpjs.includes(digits)) {
        this.errors.push('Cnpj is invalid')
      } else if (!this.invalidCnpjs.includes(digits) && !isValid) {
        this.errors.push('Cnpj is invalid')
      }
    }

    return this.errors.length === 0
  }

  private calculateSum(digits: string, weight: number): number {
    let sum = 0
    for (let i = 0; i < weight; i++) {
      sum += parseInt(digits.charAt(i)) * (weight - i)
    }
    return sum
  }

  public getErrors(): string[] {
    return this.errors
  }
}