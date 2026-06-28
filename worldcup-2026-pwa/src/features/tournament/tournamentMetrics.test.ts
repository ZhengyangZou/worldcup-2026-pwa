import { describe, expect, it } from 'vitest'

import type { Match } from '../matches/types'
import { buildTournamentMetrics } from './tournamentMetrics'

const matches: Match[] = [
  {
    away: { flag: '🇩🇪', name: '德国' },
    home: { flag: '🇧🇷', name: '巴西' },
    id: 'bra-ger',
    links: [],
    score: '2-1',
    status: "68' 进行中",
    time: 'LIVE',
    venue: 'MetLife Stadium',
  },
  {
    away: { flag: '🇫🇷', name: '法国' },
    home: { flag: '🇲🇽', name: '墨西哥' },
    id: 'mex-fra',
    links: [],
    score: '-',
    status: '未开始',
    time: '23:00',
    venue: 'Azteca',
  },
  {
    away: { flag: '🇯🇵', name: '日本' },
    home: { flag: '🇦🇷', name: '阿根廷' },
    id: 'arg-jpn',
    links: [],
    score: '3-0',
    status: '已结束',
    time: '02:00',
    venue: 'BC Place',
  },
]

describe('buildTournamentMetrics', () => {
  it('summarizes the manually maintained match list', () => {
    expect(buildTournamentMetrics(matches)).toEqual([
      { id: 'listed', label: '已录入', value: '3' },
      { id: 'live', label: '进行中', value: '1' },
      { id: 'finished', label: '已结束', value: '1' },
      { id: 'upcoming', label: '待开', value: '1' },
    ])
  })
})
