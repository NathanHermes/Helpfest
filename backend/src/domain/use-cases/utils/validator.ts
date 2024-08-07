import { Notification } from './notification'

export abstract class Validator<T> {
  public abstract validate( type: T ): Notification

  public isUndefinedOrEmpty( string: string | undefined ): boolean {
    return string === undefined || string.trim() === ''
  }
}