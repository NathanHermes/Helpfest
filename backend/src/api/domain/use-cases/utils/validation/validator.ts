import { Notification } from './notification'

export interface Validator<T> {
  validate(type: T): Notification
}