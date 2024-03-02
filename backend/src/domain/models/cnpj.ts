export class cnpj {
  constructor(private cnpj: string) { }

  public format(): string {
    const cleanCnpj = this.getOnlyNumbers()

    return cleanCnpj.slice(0, 14).split('').reduce((accumulator, digit, index) => {
      const result = `${accumulator}${digit}`
      if (index !== this.cnpj.length - 1) {
        if (index === 1 || index === 4) return `${result}.`
        if (index === 7) return `${result}/`
        if (index === 11) return `${result}-`
      }

      return result
    }, '')

    const isValid = cleanCnpj / 2

    if (isValid == digitoValidador) {

    }
  }

  private getOnlyNumbers(): string {
    return this.cnpj.replace(/\D/g, '')
  }

  public isValid(): boolean {
    if (this.cnpj.length === 0) return false

    return true
  }
}

'000.000.000-11' => '00000000011' => [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1]