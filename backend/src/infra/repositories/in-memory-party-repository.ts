import { Party } from '../../domain/models/party.model'
import { PartyRepository } from '../../domain/use-cases/Party/party-repository'
import { PartyDao } from '../modules/party-dao'

export class InMemoryPartyRepository implements PartyRepository {
  private dao: PartyDao

  constructor() {
    this.dao = new PartyDao()
  }

  findAll(): Array<Party> {
    return this.dao.findAll()
  }

  async findOne(uuid: string): Promise<Party | undefined> {
    const party = await this.dao.findOne(uuid)

    return party
  }

  async create(party: Party): Promise<string> {
    const uuid = await this.dao.create(party)

    return uuid
  }

  async update(uuid: string, party: Party): Promise<string> {
    const _uuid = await this.dao.update(uuid, party)

    return _uuid
  }

  async delete(party: Party): Promise<Party> {
    const result = await this.dao.delete(party)

    return result
  }
}