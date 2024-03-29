import { Party } from '../../models/party.model'

export interface PartyRepository {
  findAll(): Array<Party>
  findOne(uuid: string): Promise<Party | undefined>

  create(Party: Party): Promise<string>
  update(uuid: string, Party: Party): Promise<string>
  delete(Party: Party): Promise<Party>
}