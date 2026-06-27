import { describe, expect, it } from 'vitest'

import { matches } from './features/matches/matchData'
import { newsItems } from './features/news/newsData'
import { leaderboards } from './features/players/playerLeaderboardData'
import { groupStandings, thirdPlaceCandidates } from './features/standings/standingsData'

function expectUniqueIds(ids: string[]) {
  expect(new Set(ids).size).toBe(ids.length)
}

describe('manual data integrity', () => {
  it('keeps match ids unique and media links valid', () => {
    expectUniqueIds(matches.map((match) => match.id))

    for (const match of matches) {
      expect(match.home.flag).toBeTruthy()
      expect(match.away.flag).toBeTruthy()
      expect(match.links.length).toBeGreaterThan(0)
      for (const link of match.links) {
        expect(link.href).toMatch(/^https?:\/\//)
      }
    }
  })

  it('keeps all 12 groups and third-place candidates present', () => {
    expect(groupStandings).toHaveLength(12)
    expect(thirdPlaceCandidates).toHaveLength(12)
    expectUniqueIds(groupStandings.flatMap((group) => group.teams.map((team) => team.id)))
    expect(groupStandings.every((group) => group.teams.length === 4)).toBe(true)
  })

  it('keeps leaderboard tabs useful for top 20 display', () => {
    expect(leaderboards.length).toBeGreaterThanOrEqual(2)
    expectUniqueIds(leaderboards.map((leaderboard) => leaderboard.kind))

    for (const leaderboard of leaderboards) {
      expect(leaderboard.entries.length).toBeGreaterThanOrEqual(20)
      expectUniqueIds(leaderboard.entries.map((entry) => entry.playerId))
    }
  })

  it('keeps news lightweight and link-only', () => {
    expect(newsItems.length).toBeGreaterThan(0)
    expectUniqueIds(newsItems.map((item) => item.id))

    for (const item of newsItems) {
      expect(item.href).toMatch(/^https?:\/\//)
      expect(item.title).toBeTruthy()
      expect(item.source).toBeTruthy()
    }
  })
})
