import { Notification } from './notification'

export abstract class Validator<T> {
  public abstract validate( type: T ): Notification

  public undefinedOrEmpty( string: string ): boolean {
    return string === undefined || string.trim() === ''
  }
}