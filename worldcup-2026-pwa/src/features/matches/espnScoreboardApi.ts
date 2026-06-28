import { espnWorldCupScoreboardUrl, mapEspnScoreboardToMatches, type EspnScoreboard } from './espnScoreboard'
import type { Match } from './types'

type FetchLike = (input: string, init?: RequestInit) => Promise<{
  json: () => Promise<unknown>
  ok: boolean
}>

export type RemoteMatchData = {
  lastUpdated: string
  matches: Match[]
  sourceLabel: string
}

function formatLastUpdated(date = new Date()) {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    timeZone: 'Asia/Shanghai',
  }).format(date)
}

export async function fetchEspnScoreboardMatches(fetchImpl: FetchLike = fetch): Promise<RemoteMatchData> {
  const response = await fetchImpl(espnWorldCupScoreboardUrl, { cache: 'no-store' })

  if (!response.ok) {
    throw new Error('ESPN 数据请求失败')
  }

  const scoreboard = await response.json() as EspnScoreboard
  const matches = mapEspnScoreboardToMatches(scoreboard)

  if (matches.length === 0) {
    throw new Error('ESPN 暂无可用赛程数据')
  }

  return {
    lastUpdated: formatLastUpdated(),
    matches,
    sourceLabel: '来源：ESPN 自动比分 / 央视 / 澳视 / YouTube 官方频道',
  }
}
