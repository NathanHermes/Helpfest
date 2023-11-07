import { CompanyRepository } from './company-repository'
import { sign } from 'jsonwebtoken'

export class LoginUseCase {
  constructor (private repository: CompanyRepository) { }

  async execute (email: string, secret: string): Promise<object | undefined> {
    const company = await this.repository.findOneByEmail(email)

    if (!company) throw new Error('Login inválido')

    if (secret !== company._secret) throw new Error('Senha inválida')

    const token = sign(
      { id: company._uuid, email: company._email },
      'HELPFEST',
      {
        expiresIn: '4h',
      }
    )

    return { token, company }
  }
}