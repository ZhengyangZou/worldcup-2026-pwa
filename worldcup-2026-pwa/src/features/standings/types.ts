export type GroupCode =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'

export type ThirdPlaceCandidate = {
  group: GroupCode
  teamId: string
  teamName: string
  flag?: string
  points: number
  goalDifference: number
  goalsFor: number
  fairPlayPoints: number
}

export type RankedThirdPlaceTeam = ThirdPlaceCandidate & {
  rank: number
  advances: boolean
}

export type StandingStatus = 'advance' | 'thirdComparison' | 'out'

export interface StandingTeam {
  id: string
  flag: string
  name: string
  points: number
  goalDifference: number
  status: StandingStatus
}

export interface GroupStanding {
  code: GroupCode
  teams: StandingTeam[]
}
