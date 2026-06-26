export type LeaderboardKind = 'goals' | 'assists' | 'saves' | 'yellowCards'

export interface LeaderboardEntry {
  playerId: string
  playerName: string
  teamName: string
  teamFlag: string
  position: string
  value: number
  avatarUrl?: string
  fallbackColor: string
}

export interface LeaderboardConfig {
  kind: LeaderboardKind
  title: string
  unit: string
  entries: LeaderboardEntry[]
}

export interface PlayerProfile {
  age: number
  avatarUrl?: string
  fallbackColor: string
  id: string
  keyStat: string
  name: string
  position: string
  teamFlag: string
  teamName: string
}
