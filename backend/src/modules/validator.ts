export interface Validator<T> {
  validate(type: T): Promise<string | undefined>
}