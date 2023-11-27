export class IllegalArgumentError extends Error {
  code: number = 400
  status: string = 'Bad Request'

  constructor (msg: string) {
    super(msg)
    this.name = 'IllegalArgumentError'
  }
}