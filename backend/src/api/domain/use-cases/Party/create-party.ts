import { Party, PartyArgs } from '../../entities/party'
import { PartyRepository } from './party-repository'

export class CreatePartyUseCase {
  constructor (
    private repository: PartyRepository
  ) { }

  async execute ({ name, partyDate, partyTime, celebrities, observations, uuidCompany }: PartyArgs): Promise<string | undefined> {
    const party = new Party({
      name,
      partyDate,
      partyTime,
      celebrities,
      observations,
      uuidCompany
    })

    const uuid = await this.repository.create(party)

    return uuid
  }
}