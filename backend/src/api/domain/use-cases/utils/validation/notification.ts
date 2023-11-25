export class Notification {
  private errors: Array<string> = new Array<string>()

  constructor() {}

  public addError(message: string): void {
    this.errors.push(message)
  }

  public isCorrect(): boolean {
    return this.errors.length === 0
  }

  public hasErrors(): boolean {
    return !this.isCorrect()
  }

  public errorMessage(): string {
    return this.errors[0]
  }
}