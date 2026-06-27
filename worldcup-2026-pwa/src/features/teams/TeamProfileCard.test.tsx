import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TeamProfileCard } from './TeamProfileCard'
import type { TeamProfile } from './types'

const profile: TeamProfile = {
  coach: '德尚',
  fifaRank: 2,
  flag: '🇫🇷',
  group: 'D',
  id: 'D-fra',
  name: '法国',
  status: '小组前二',
  summary: '阵容深度突出，边路冲击和转换速度是主要优势。',
}

describe('TeamProfileCard', () => {
  it('renders a linkable team information card', () => {
    render(<TeamProfileCard profile={profile} />)

    expect(screen.getByRole('heading', { name: '球队信息' })).toBeInTheDocument()
    expect(screen.getByTestId('team-profile')).toHaveAttribute('id', 'team-D-fra')
    expect(screen.getByTestId('teams-anchor')).toHaveAttribute('id', '球队')
    expect(screen.getByText('🇫🇷 法国')).toBeInTheDocument()
    expect(screen.getByText('D 组 · FIFA 第 2 · 德尚')).toBeInTheDocument()
    expect(screen.getByText('小组前二')).toBeInTheDocument()
    expect(screen.getByText('阵容深度突出，边路冲击和转换速度是主要优势。')).toBeInTheDocument()
  })
})
