import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PlayerProfileCard } from './PlayerProfileCard'
import type { PlayerProfile } from './types'

const profile: PlayerProfile = {
  age: 27,
  fallbackColor: '#1f4aa8',
  id: 'mbappe',
  keyStat: '本届 5 球 1 助攻',
  name: '姆巴佩',
  position: '前锋',
  teamFlag: '🇫🇷',
  teamName: '法国',
}

describe('PlayerProfileCard', () => {
  it('renders a linkable player information card with avatar fallback', () => {
    render(<PlayerProfileCard profile={profile} />)

    expect(screen.getByRole('heading', { name: '球员信息' })).toBeInTheDocument()
    expect(screen.getByTestId('player-profile')).toHaveAttribute('id', 'player-mbappe')
    expect(screen.getByText('姆巴佩')).toBeInTheDocument()
    expect(screen.getByText('🇫🇷 法国 · 前锋 · 27岁')).toBeInTheDocument()
    expect(screen.getByText('本届 5 球 1 助攻')).toBeInTheDocument()
    expect(screen.getByTestId('avatar-fallback')).toHaveTextContent('姆')
  })
})
