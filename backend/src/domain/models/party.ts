export interface PartyArgs {
  uuid?: string
  name?: string
  partyDate?: string
  partyTime?: string
  celebrities?: string
  observations?: string
  uuidCompany?: string
}

export class Party {
  private uuid?: string
  private name: string
  private partyDate: string
  private partyTime: string
  private celebrities?: string
  private observations?: string
  private uuidCompany: string

  constructor(args?: PartyArgs) {
    this.uuid = args?.uuid
    this.name = args?.name || ''
    this.partyDate = args?.partyDate || ''
    this.partyTime = args?.partyTime || ''
    this.celebrities = args?.celebrities
    this.observations = args?.observations
    this.uuidCompany = args?.uuidCompany || ''
  }

  get _uuid(): string | undefined { return this.uuid }
  set _uuid(uuid: string) { this.uuid = uuid }

  get _name() { return this.name }

  get _eventDate() { return this.partyDate }

  get _partyTime() { return this.partyTime }

  get _celebrities() { return this.celebrities }

  get _observations() { return this.observations }

  get _uuidCompany() { return this.uuidCompany }
}