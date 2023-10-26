import { Party, PartyArgs } from '../../entities/party'
import { PartyRepository } from './party-repository'

export class UpdatePartyUseCase {
  constructor (
    private repository: PartyRepository
  ) { }

  async execute ({ uuid, name, partyDate, partyTime, celebrities, observations }: PartyArgs): Promise<string | undefined> {
    const party = new Party({
      uuid,
      name,
      partyDate,
      partyTime,
      celebrities,
      observations
    })

    const _uuid = await this.repository.update(uuid!, party)

    return _uuid
  }
}