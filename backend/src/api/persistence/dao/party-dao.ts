import { Party } from '../../domain/entities/Party/party'
import { DAO } from '../../utils/DAO'
import { randomUUID } from 'crypto'

export class PartyDao implements DAO<Party, string> {
  private parties: Array<Party> = new Array<Party>

  findAll (): Array<Party> {
    return this.parties
  }

  async findOne (uuid: string): Promise<Party | undefined> {
    const party = this.parties.find(_party => _party._uuid === uuid)

    return party
  }

  async create (party: Party): Promise<string> {
    party._uuid = randomUUID()
    const partyIndex = this.parties.push(party)

    return this.parties[partyIndex - 1]._uuid || ''
  }

  async update (uuid: string, party: Party): Promise<string> {
    this.parties = this.parties.map(_party => _party._uuid === uuid ? party : _party)

    return uuid
  }

  async delete (party: Party): Promise<Party> {
    this.parties = this.parties.filter(_party => _party !== party)

    return party
  }
}