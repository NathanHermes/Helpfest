export class Notification {
  private errors: Array<Error> = new Array<Error>()

  constructor() {}

  public addError(message: string): void {
    this.errors.push(new Error(message))
  }

  public isCorrect(): boolean {
    return this.errors.length === 0
  }

  public hasErrors(): boolean {
    return !this.isCorrect()
  }

  public errorMessage(): string {
    console.log(this.errors.map(_message => _message.message))
    return 'In progress'
  }
}