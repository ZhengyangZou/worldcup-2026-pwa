import type { Match } from '../matches/types'
import type { TournamentMetric } from './types'

export function buildTournamentMetrics(matches: Match[]): TournamentMetric[] {
  const live = matches.filter((match) => match.time === 'LIVE' || match.status.includes('进行中')).length
  const finished = matches.filter((match) => match.status === '已结束').length
  const upcoming = matches.filter((match) => match.status === '未开始').length

  return [
    { id: 'listed', label: '已录入', value: String(matches.length) },
    { id: 'live', label: '进行中', value: String(live) },
    { id: 'finished', label: '已结束', value: String(finished) },
    { id: 'upcoming', label: '待开', value: String(upcoming) },
  ]
}
