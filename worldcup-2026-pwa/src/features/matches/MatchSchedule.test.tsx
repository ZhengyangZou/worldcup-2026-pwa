import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MatchSchedule } from './MatchSchedule'
import type { Match } from './types'

const matches: Match[] = [
  {
    id: 'bra-ger',
    time: 'LIVE',
    venue: 'MetLife Stadium',
    status: "68' 进行中",
    home: { name: '巴西', flag: '🇧🇷' },
    away: { name: '德国', flag: '🇩🇪' },
    score: '2-1',
    links: [
      { label: '澳视直播', href: 'https://www.tdm.com.mo/zh-hant/live?Channel=6&type=tv', kind: 'live' },
      { label: '央视频', href: 'https://worldcup.cctv.com/', kind: 'live' },
    ],
  },
  {
    id: 'arg-jpn',
    time: '02:00',
    venue: 'BC Place',
    status: '已结束',
    home: { name: '阿根廷', flag: '🇦🇷' },
    away: { name: '日本', flag: '🇯🇵' },
    score: '3-0',
    links: [
      { label: 'FIFA集锦', href: 'https://www.youtube.com/@fifa', kind: 'highlight' },
      { label: '央视频集锦', href: 'https://worldcup.cctv.com/', kind: 'highlight' },
    ],
  },
]

describe('MatchSchedule', () => {
  it('renders match cards with team flags and region-specific media links', () => {
    const { container } = render(<MatchSchedule matches={matches} />)

    expect(screen.getByRole('heading', { name: '赛程与比分' })).toBeInTheDocument()
    expect(screen.getAllByTestId('match-card')).toHaveLength(2)

    const liveMatch = container.querySelector<HTMLElement>('#match-bra-ger')
    if (!liveMatch) throw new Error('Expected Brazil vs Germany match card')
    expect(within(liveMatch).getByRole('link', { name: '查看巴西对德国赛况' })).toHaveAttribute(
      'href',
      '#match-detail-bra-ger',
    )
    expect(within(liveMatch).getByText('🇧🇷')).toBeInTheDocument()
    expect(within(liveMatch).getByText('巴西')).toBeInTheDocument()
    expect(within(liveMatch).getByText('德国')).toBeInTheDocument()
    expect(within(liveMatch).getByRole('link', { name: '澳视直播' })).toHaveAttribute(
      'href',
      'https://www.tdm.com.mo/zh-hant/live?Channel=6&type=tv',
    )
    expect(within(liveMatch).getByRole('link', { name: '澳视直播' })).toHaveAttribute('rel', 'noopener noreferrer')
    expect(within(liveMatch).getByRole('link', { name: '央视频' })).toHaveAttribute(
      'href',
      'https://worldcup.cctv.com/',
    )

    const finishedMatch = container.querySelector<HTMLElement>('#match-arg-jpn')
    if (!finishedMatch) throw new Error('Expected Argentina vs Japan match card')
    expect(within(finishedMatch).getByRole('link', { name: 'FIFA集锦' })).toHaveAttribute(
      'href',
      'https://www.youtube.com/@fifa',
    )
  })
})
