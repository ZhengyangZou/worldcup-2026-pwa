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
  points: number
  goalDifference: number
  goalsFor: number
  fairPlayPoints: number
}

export type RankedThirdPlaceTeam = ThirdPlaceCandidate & {
  rank: number
  advances: boolean
}
