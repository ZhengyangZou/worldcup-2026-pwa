import { describe, expect, it } from 'vitest'

import { rankThirdPlacedTeams } from './thirdPlaceRanking'
import type { ThirdPlaceCandidate } from './types'

describe('rankThirdPlacedTeams', () => {
  it('marks the best eight third-place teams as advancing after tie-break sorting', () => {
    const candidates: ThirdPlaceCandidate[] = [
      { group: 'A', teamId: 'rsa', teamName: '南非', points: 1, goalDifference: -2, goalsFor: 1, fairPlayPoints: -3 },
      { group: 'B', teamId: 'jpn', teamName: '日本', points: 3, goalDifference: -1, goalsFor: 3, fairPlayPoints: -1 },
      { group: 'C', teamId: 'usa', teamName: '美国', points: 2, goalDifference: 0, goalsFor: 2, fairPlayPoints: -2 },
      { group: 'D', teamId: 'mar', teamName: '摩洛哥', points: 3, goalDifference: -1, goalsFor: 2, fairPlayPoints: -1 },
      { group: 'E', teamId: 'sui', teamName: '瑞士', points: 3, goalDifference: 0, goalsFor: 2, fairPlayPoints: -4 },
      { group: 'F', teamId: 'cro', teamName: '克罗地亚', points: 2, goalDifference: 0, goalsFor: 1, fairPlayPoints: -2 },
      { group: 'G', teamId: 'cmr', teamName: '喀麦隆', points: 3, goalDifference: -1, goalsFor: 2, fairPlayPoints: -3 },
      { group: 'H', teamId: 'pol', teamName: '波兰', points: 3, goalDifference: -1, goalsFor: 2, fairPlayPoints: -2 },
      { group: 'I', teamId: 'gha', teamName: '加纳', points: 2, goalDifference: 0, goalsFor: 2, fairPlayPoints: -5 },
      { group: 'J', teamId: 'ukr', teamName: '乌克兰', points: 3, goalDifference: 0, goalsFor: 1, fairPlayPoints: -1 },
      { group: 'K', teamId: 'par', teamName: '巴拉圭', points: 3, goalDifference: 0, goalsFor: 1, fairPlayPoints: -2 },
      { group: 'L', teamId: 'civ', teamName: '科特迪瓦', points: 3, goalDifference: 0, goalsFor: 1, fairPlayPoints: -3 },
    ]

    const ranked = rankThirdPlacedTeams(candidates)

    expect(ranked).toHaveLength(12)
    expect(ranked.slice(0, 8).map((entry) => entry.advances)).toEqual(Array(8).fill(true))
    expect(ranked.slice(8).map((entry) => entry.advances)).toEqual(Array(4).fill(false))
    expect(ranked.map((entry) => entry.teamId)).toEqual([
      'sui',
      'ukr',
      'par',
      'civ',
      'jpn',
      'mar',
      'pol',
      'cmr',
      'usa',
      'gha',
      'cro',
      'rsa',
    ])
  })
})
