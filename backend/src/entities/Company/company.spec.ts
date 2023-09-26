import { expect, test } from 'vitest'
import { Company } from './company'



test('should be able to create a object instance of company', () => {
  const company = new Company({
    name: 'Oasis Eventos',
    email: 'oasis@gmail.com',
    CNPJ: '56041364000174',
    phone: '1136861256',
    address: 'Rod. Washington Luís',
    number: '',
    city: 'São Carlos',
    uf: 'SP',
    complement: '',
    secret: 'test'
  })

  expect(company).toBeInstanceOf(Company)
})