import { describe, expect, it } from 'vitest'

import type { Match } from '../matches/types'
import { buildHomeHeroContent } from './homeHeroContent'

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
]

describe('buildHomeHeroContent', () => {
  it('derives the matchday headline from the current match list', () => {
    expect(buildHomeHeroContent(matches).title).toBe('今日 2 场比赛，1 场正在进行')
  })
})
