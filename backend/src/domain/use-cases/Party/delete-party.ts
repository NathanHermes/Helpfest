import { Party, PartyArgs } from '../../models/party.model'
import { PartyRepository } from './party-repository'

export class DeletePartyUseCase {
  constructor(
    private repository: PartyRepository
  ) { }

  async execute({ uuid }: PartyArgs): Promise<Party | undefined> {
    const party = await this.repository.findOne(uuid!)

    const result = await this.repository.delete(party!)

    return result
  }
}