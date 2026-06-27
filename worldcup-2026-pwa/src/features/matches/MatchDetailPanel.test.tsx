import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MatchDetailPanel } from './MatchDetailPanel'
import type { Match } from './types'

const match: Match = {
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
}

describe('MatchDetailPanel', () => {
  it('shows the selected match and the required detail tabs', () => {
    render(<MatchDetailPanel match={match} />)

    expect(screen.getByRole('heading', { name: '比赛详情' })).toBeInTheDocument()
    expect(screen.getByTestId('match-detail-panel')).toHaveAttribute('id', 'match-detail-bra-ger')
    expect(screen.getByText('🇧🇷 巴西 2-1 🇩🇪 德国')).toBeInTheDocument()

    for (const tab of ['赛况', '阵容', '数据', '集锦', '新闻']) {
      expect(screen.getByRole('tab', { name: tab })).toBeInTheDocument()
    }

    expect(screen.getByRole('tab', { name: '赛况' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('直播和集锦以当地版权可用性为准；比赛日前优先替换为具体场次链接。')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '澳视直播' })).toHaveAttribute(
      'href',
      'https://www.tdm.com.mo/zh-hant/live?Channel=6&type=tv',
    )
    expect(screen.getByRole('link', { name: '澳视直播' })).toHaveAttribute('rel', 'noopener noreferrer')

    fireEvent.click(screen.getByRole('tab', { name: '集锦' }))
    expect(screen.getByRole('tab', { name: '集锦' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('集锦入口会优先使用 FIFA 和央视频的具体场次视频。')).toBeInTheDocument()
  })
})
