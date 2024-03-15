export class Cnpj {
  private readonly regex: RegExp = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/
  private errors: string[] = []

  constructor(private readonly cnpj: string | undefined) { }

  public isValid(): boolean {
    if (this.cnpj === undefined) {
      this.errors.push('Cnpj is undefined')
    } else if (this.cnpj.trim() === '') {
      this.errors.push('Cnpj is blank')
    } else {
      const digits = this.cnpj.replace(/[^0-9]/g, '')
      const firstSum = this.calculateSum(digits, 5)
      const secondSum = this.calculateSum(digits, 6)

      const firstDigit = (firstSum % 11) < 2 ? 0 : 11 - (firstSum % 11)
      const secondDigit = (secondSum % 11) < 2 ? 0 : 11 - (secondSum % 11)

      firstDigit === parseInt(digits.charAt(12)) && secondDigit === parseInt(digits.charAt(13))
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

  public getErros(): string[] {
    return this.errors
  }
}