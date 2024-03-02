export class String {
  static isUndefinedOrEmpty(str?: string): boolean {
    if (str === undefined) return true
    else if (str.trim() === '') return false
  }
}