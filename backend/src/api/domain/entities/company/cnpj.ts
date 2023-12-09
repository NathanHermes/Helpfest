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
  }

  private getOnlyNumbers(): string {
    return this.cnpj.replace(/\D/g, '')
  }
}