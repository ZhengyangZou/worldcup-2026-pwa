import { cctvWorldCupUrl, fifaYoutubeUrl, tdmSportsLiveUrl } from './matchData'
import type { Match, MatchMediaLink, TeamRef } from './types'

export const espnWorldCupScoreboardUrl = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?limit=100'

type EspnTeam = {
  abbreviation?: string
  displayName?: string
  name?: string
  shortDisplayName?: string
}

type EspnCompetitor = {
  homeAway?: string
  score?: string
  team?: EspnTeam
}

type EspnCompetition = {
  competitors?: EspnCompetitor[]
  status?: {
    displayClock?: string
    type?: {
      completed?: boolean
      state?: string
    }
  }
  venue?: {
    displayName?: string
    fullName?: string
  }
}

type EspnEvent = {
  competitions?: EspnCompetition[]
  date?: string
  id?: string
  links?: Array<{
    href?: string
    text?: string
  }>
}

export type EspnScoreboard = {
  events?: EspnEvent[]
}

const teamNameByAbbreviation: Record<string, string> = {
  ARG: '阿根廷',
  BRA: '巴西',
  CAN: '加拿大',
  FRA: '法国',
  GER: '德国',
  JPN: '日本',
  MEX: '墨西哥',
  RSA: '南非',
}

const flagByAbbreviation: Record<string, string> = {
  ARG: '🇦🇷',
  BRA: '🇧🇷',
  CAN: '🇨🇦',
  FRA: '🇫🇷',
  GER: '🇩🇪',
  JPN: '🇯🇵',
  MEX: '🇲🇽',
  RSA: '🇿🇦',
}

function formatBeijingTime(isoDate?: string) {
  if (!isoDate) return '待定'

  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    timeZone: 'Asia/Shanghai',
  }).format(new Date(isoDate))
}

function mapTeam(team?: EspnTeam): TeamRef {
  const abbreviation = team?.abbreviation?.toUpperCase() ?? ''
  return {
    flag: flagByAbbreviation[abbreviation] ?? '🏳️',
    name: teamNameByAbbreviation[abbreviation] ?? team?.displayName ?? team?.shortDisplayName ?? team?.name ?? '待定球队',
  }
}

function buildStatus(competition: EspnCompetition) {
  const state = competition.status?.type?.state
  const completed = competition.status?.type?.completed

  if (completed || state === 'post') return '已结束'
  if (state === 'in') return `${competition.status?.displayClock ?? 'LIVE'} 进行中`

  return '未开始'
}

function buildLinks(event: EspnEvent, isCompleted: boolean): MatchMediaLink[] {
  const links: MatchMediaLink[] = isCompleted
    ? [
        { label: 'FIFA集锦', href: fifaYoutubeUrl, kind: 'highlight' },
        { label: '央视频集锦', href: cctvWorldCupUrl, kind: 'highlight' },
      ]
    : [
        { label: '澳视直播', href: tdmSportsLiveUrl, kind: 'live' },
        { label: '央视频', href: cctvWorldCupUrl, kind: 'live' },
      ]

  const espnSummaryLink = event.links?.find((link) => link.href?.startsWith('https://www.espn.com/'))
  if (espnSummaryLink?.href) {
    links.push({ label: 'ESPN赛况', href: espnSummaryLink.href, kind: 'news' })
  }

  return links
}

export function mapEspnScoreboardToMatches(scoreboard: EspnScoreboard): Match[] {
  return (scoreboard.events ?? []).flatMap((event) => {
    const competition = event.competitions?.[0]
    const home = competition?.competitors?.find((competitor) => competitor.homeAway === 'home')
    const away = competition?.competitors?.find((competitor) => competitor.homeAway === 'away')

    if (!competition || !home || !away || !event.id) return []

    const isCompleted = competition.status?.type?.completed === true || competition.status?.type?.state === 'post'
    const isLive = competition.status?.type?.state === 'in'

    return {
      id: `espn-${event.id}`,
      time: isLive ? 'LIVE' : formatBeijingTime(event.date),
      venue: competition.venue?.fullName ?? competition.venue?.displayName ?? '待定球场',
      home: mapTeam(home.team),
      score: competition.status?.type?.state === 'pre' ? '-' : `${home.score ?? 0}-${away.score ?? 0}`,
      away: mapTeam(away.team),
      status: buildStatus(competition),
      links: buildLinks(event, isCompleted),
    }
  })
}
