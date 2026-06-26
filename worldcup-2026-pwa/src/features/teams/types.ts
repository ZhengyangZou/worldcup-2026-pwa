import type { GroupCode } from '../standings/types'

export type TeamProfile = {
  coach: string
  fifaRank: number
  flag: string
  group: GroupCode
  id: string
  name: string
  status: string
  summary: string
}
