export type MediaLinkKind = 'live' | 'highlight' | 'news'

export interface TeamRef {
  name: string
  flag: string
}

export interface MatchMediaLink {
  label: string
  href: string
  kind: MediaLinkKind
}

export interface Match {
  id: string
  time: string
  venue: string
  status: string
  home: TeamRef
  away: TeamRef
  score: string
  links: MatchMediaLink[]
}
