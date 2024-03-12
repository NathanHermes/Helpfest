export interface IValidator<T> {
  validate(type: T): boolean
  getErrors(): string[]
}