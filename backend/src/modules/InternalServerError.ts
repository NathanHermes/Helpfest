export class InternalServerError extends Error {
  statusCode: number = 500
  constructor (msg: string) {
    super(msg)
    this.name = 'InternalServerError'
  }
}