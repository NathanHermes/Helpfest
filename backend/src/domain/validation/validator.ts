export interface Validator<T> {
  validate(type: T): boolean
  getErrors(): string[]
}