import type { GroupStanding, GroupCode, ThirdPlaceCandidate } from './types'

const groupCodes: GroupCode[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

export const groupStandings: GroupStanding[] = groupCodes.map((code) => ({
  code,
  teams: [
    { id: `${code}-mex`, flag: '🇲🇽', name: '墨西哥', points: 6, goalDifference: 4, status: 'advance' },
    { id: `${code}-kor`, flag: '🇰🇷', name: '韩国', points: 4, goalDifference: 1, status: 'advance' },
    { id: `${code}-jpn`, flag: '🇯🇵', name: '日本', points: 3, goalDifference: -1, status: 'thirdComparison' },
    { id: `${code}-rsa`, flag: '🇿🇦', name: '南非', points: 1, goalDifference: -2, status: 'out' },
  ],
}))

export const thirdPlaceCandidates: ThirdPlaceCandidate[] = [
  { group: 'A', teamId: 'rsa', teamName: '南非', flag: '🇿🇦', points: 1, goalDifference: -2, goalsFor: 1, fairPlayPoints: -3 },
  { group: 'B', teamId: 'jpn', teamName: '日本', flag: '🇯🇵', points: 3, goalDifference: -1, goalsFor: 3, fairPlayPoints: -1 },
  { group: 'C', teamId: 'usa', teamName: '美国', flag: '🇺🇸', points: 2, goalDifference: 0, goalsFor: 2, fairPlayPoints: -2 },
  { group: 'D', teamId: 'mar', teamName: '摩洛哥', flag: '🇲🇦', points: 3, goalDifference: -1, goalsFor: 2, fairPlayPoints: -1 },
  { group: 'E', teamId: 'sui', teamName: '瑞士', flag: '🇨🇭', points: 3, goalDifference: 0, goalsFor: 2, fairPlayPoints: -4 },
  { group: 'F', teamId: 'cro', teamName: '克罗地亚', flag: '🇭🇷', points: 2, goalDifference: 0, goalsFor: 1, fairPlayPoints: -2 },
  { group: 'G', teamId: 'cmr', teamName: '喀麦隆', flag: '🇨🇲', points: 3, goalDifference: -1, goalsFor: 2, fairPlayPoints: -3 },
  { group: 'H', teamId: 'pol', teamName: '波兰', flag: '🇵🇱', points: 3, goalDifference: -1, goalsFor: 2, fairPlayPoints: -2 },
  { group: 'I', teamId: 'gha', teamName: '加纳', flag: '🇬🇭', points: 2, goalDifference: 0, goalsFor: 2, fairPlayPoints: -5 },
  { group: 'J', teamId: 'ukr', teamName: '乌克兰', flag: '🇺🇦', points: 3, goalDifference: 0, goalsFor: 1, fairPlayPoints: -1 },
  { group: 'K', teamId: 'par', teamName: '巴拉圭', flag: '🇵🇾', points: 3, goalDifference: 0, goalsFor: 1, fairPlayPoints: -2 },
  { group: 'L', teamId: 'civ', teamName: '科特迪瓦', flag: '🇨🇮', points: 3, goalDifference: 0, goalsFor: 1, fairPlayPoints: -3 },
]
