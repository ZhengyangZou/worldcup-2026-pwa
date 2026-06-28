import type { Match } from '../matches/types'
import { homeHero } from './homeData'
import type { HomeHeroContent } from './types'

export function buildHomeHeroContent(matches: Match[]): HomeHeroContent {
  const liveMatches = matches.filter((match) => match.time === 'LIVE' || match.status.includes('进行中')).length

  return {
    ...homeHero,
    title: `今日 ${matches.length} 场比赛，${liveMatches} 场正在进行`,
  }
}
