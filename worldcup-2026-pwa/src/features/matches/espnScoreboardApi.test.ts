import { describe, expect, it, vi } from 'vitest'

import { fetchEspnScoreboardMatches } from './espnScoreboardApi'

const scoreboard = {
  events: [
    {
      id: '760486',
      date: '2026-06-28T19:00Z',
      competitions: [
        {
          status: {
            displayClock: "0'",
            type: { state: 'pre', completed: false },
          },
          venue: { fullName: 'SoFi Stadium' },
          competitors: [
            {
              homeAway: 'home',
              score: '0',
              team: { abbreviation: 'RSA', displayName: 'South Africa' },
            },
            {
              homeAway: 'away',
              score: '0',
              team: { abbreviation: 'CAN', displayName: 'Canada' },
            },
          ],
        },
      ],
    },
  ],
}

describe('fetchEspnScoreboardMatches', () => {
  it('fetches ESPN scoreboard data and returns mapped matches with metadata', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      json: async () => scoreboard,
      ok: true,
    })

    const result = await fetchEspnScoreboardMatches(fetchImpl)

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?limit=100',
      { cache: 'no-store' },
    )
    expect(result.matches).toHaveLength(1)
    expect(result.sourceLabel).toBe('来源：ESPN 自动比分 / 央视 / 澳视 / YouTube 官方频道')
    expect(result.lastUpdated).toMatch(/^\d{2}:\d{2}$/)
  })

  it('throws when ESPN returns no usable matches', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      json: async () => ({ events: [] }),
      ok: true,
    })

    await expect(fetchEspnScoreboardMatches(fetchImpl)).rejects.toThrow('ESPN 暂无可用赛程数据')
  })
})
