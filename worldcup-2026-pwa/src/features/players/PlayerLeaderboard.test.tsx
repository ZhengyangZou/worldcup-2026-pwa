import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PlayerLeaderboard } from './PlayerLeaderboard'
import type { LeaderboardEntry } from './types'

const entries: LeaderboardEntry[] = Array.from({ length: 22 }, (_, index) => ({
  playerId: `player-${index + 1}`,
  playerName: index === 0 ? '姆巴佩' : `球员${index + 1}`,
  teamName: index === 0 ? '法国' : '巴西',
  teamFlag: index === 0 ? '🇫🇷' : '🇧🇷',
  position: index === 0 ? '前锋' : '中场',
  value: 22 - index,
  avatarUrl: index === 1 ? 'https://example.com/avatar.jpg' : undefined,
  fallbackColor: index === 0 ? '#1f4aa8' : '#0a7555',
}))

describe('PlayerLeaderboard', () => {
  it('shows the selected leaderboard as top 20 with avatar fallback and player links', () => {
    render(<PlayerLeaderboard entries={entries} title="射手榜" unit="球" />)

    expect(screen.getByRole('heading', { name: '球员榜' })).toBeInTheDocument()
    expect(screen.getByText('射手榜 Top 20')).toBeInTheDocument()
    expect(screen.getAllByTestId('leader-row')).toHaveLength(20)
    expect(screen.queryByText('球员21')).not.toBeInTheDocument()

    const firstRow = screen.getAllByTestId('leader-row')[0]
    expect(firstRow).toHaveAttribute('href', '#player-player-1')
    expect(within(firstRow).getByText('姆巴佩')).toBeInTheDocument()
    expect(within(firstRow).getByText('🇫🇷 法国 · 前锋')).toBeInTheDocument()
    expect(within(firstRow).getByText('22')).toBeInTheDocument()
    expect(within(firstRow).getByText('姆')).toBeInTheDocument()
    expect(within(firstRow).getByTestId('avatar-fallback')).toHaveStyle({ background: '#1f4aa8' })

    const secondRow = screen.getAllByTestId('leader-row')[1]
    expect(within(secondRow).getByAltText('球员2头像')).toHaveAttribute('src', 'https://example.com/avatar.jpg')
  })
})
