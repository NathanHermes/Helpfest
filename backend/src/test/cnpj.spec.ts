import { describe, expect, it } from 'vitest'
import { cnpj } from '../models/cnpj'

describe('cnpj class test cases', () => {
  describe('format', () => {
    it('should return cnpj with dots, slash and dash', () => {
      const _cnpj: cnpj = new cnpj('26149878000187')

      expect(_cnpj.format()).toBe('26.149.878/0001-87')
    })
  })

  it('should return false to an empty cnpj', () => {
    const _cnpj = new cnpj('')

    expect(_cnpj.isValid()).toBeFalsy()
  })
})