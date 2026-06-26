import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StandingsSection } from './StandingsSection'
import type { GroupStanding, ThirdPlaceCandidate } from './types'

const groups: GroupStanding[] = Array.from({ length: 12 }, (_, index) => {
  const code = String.fromCharCode(65 + index) as GroupStanding['code']

  return {
    code,
    teams: [
      { id: `${code}-mex`, flag: '🇲🇽', name: '墨西哥', points: 6, goalDifference: 4, status: 'advance' },
      { id: `${code}-kor`, flag: '🇰🇷', name: '韩国', points: 4, goalDifference: 1, status: 'advance' },
      { id: `${code}-jpn`, flag: '🇯🇵', name: '日本', points: 3, goalDifference: -1, status: 'thirdComparison' },
      { id: `${code}-rsa`, flag: '🇿🇦', name: '南非', points: 1, goalDifference: -2, status: 'out' },
    ],
  }
})

const thirdPlaceCandidates: ThirdPlaceCandidate[] = [
  { group: 'A', teamId: 'rsa', teamName: '南非', flag: '🇿🇦', points: 1, goalDifference: -2, goalsFor: 1, fairPlayPoints: -3 },
  { group: 'B', teamId: 'jpn', teamName: '日本', flag: '🇯🇵', points: 3, goalDifference: -1, goalsFor: 3, fairPlayPoints: -1 },
  { group: 'C', teamId: 'usa', teamName: '美国', flag: '🇺🇸', points: 2, goalDifference: 0, goalsFor: 2, fairPlayPoints: -2 },
  { group: 'D', teamId: 'mar', teamName: '摩洛哥', flag: '🇲🇦', points: 3, goalDifference: -1, goalsFor: 2, fairPlayPoints: -1 },
  { group: 'E', teamId: 'sui', teamName: '瑞士', flag: '🇨🇭', points: 3, goalDifference: 0, goalsFor: 2, fairPlayPoints: -4 },
  { group: 'F', teamId: 'cro', teamName: '克罗地亚', flag: '🇭🇷', points: 2, goalDifference: 0, goalsFor: 1, fairPlayPoints: -2 },
  { group: 'G', teamId: 'cmr', teamName: '喀麦隆', flag: '🇨🇲', points: 3, goalDifference: -1, goalsFor: 2, fairPlayPoints: -3 },
  { group: 'H', teamId: 'pol', teamName: '波兰', flag: '🇵🇱', points: 3, goalDifference: -1, goalsFor: 2, fairPlayPoints: -2 },
  { group: 'I', teamId: 'gha', teamName: '加纳', flag: '🇬🇭', points: 2, goalDifference: 0, goalsFor: 2, fairPlayPoints: -5 },
  { group: 'J', teamId: 'ukr', teamName: '乌克兰', flag: '🇺🇦', points: 3, goalDifference: 0, goalsFor: 1, fairPlayPoints: -1 },
  { group: 'K', teamId: 'par', teamName: '巴拉圭', flag: '🇵🇾', points: 3, goalDifference: 0, goalsFor: 1, fairPlayPoints: -2 },
  { group: 'L', teamId: 'civ', teamName: '科特迪瓦', flag: '🇨🇮', points: 3, goalDifference: 0, goalsFor: 1, fairPlayPoints: -3 },
]

describe('StandingsSection', () => {
  it('renders all 12 groups and ranks third-place teams with top eight advancing', () => {
    const { container } = render(<StandingsSection groups={groups} thirdPlaceCandidates={thirdPlaceCandidates} />)

    expect(screen.getByRole('heading', { name: '分组积分' })).toBeInTheDocument()
    expect(screen.getAllByTestId('group-card')).toHaveLength(12)
    expect(screen.getByRole('heading', { name: '小组第三名排名' })).toBeInTheDocument()

    const firstGroup = container.querySelector<HTMLElement>('#group-A')
    if (!firstGroup) throw new Error('Expected A group card')
    expect(within(firstGroup).getByText('🇲🇽 墨西哥')).toBeInTheDocument()
    expect(within(firstGroup).getByRole('link', { name: '🇲🇽 墨西哥' })).toHaveAttribute('href', '#team-A-mex')
    expect(within(firstGroup).getAllByText('晋级区')).toHaveLength(2)
    expect(within(firstGroup).getByText('第3比较')).toBeInTheDocument()

    const thirdRows = screen.getAllByTestId('third-place-row')
    expect(thirdRows).toHaveLength(12)
    expect(within(thirdRows[0]).getByText('🇨🇭 瑞士')).toBeInTheDocument()
    expect(within(thirdRows[0]).getByRole('link', { name: '🇨🇭 瑞士' })).toHaveAttribute('href', '#team-sui')
    expect(thirdRows.slice(0, 8).every((row) => within(row).queryByText('晋级'))).toBe(true)
    expect(within(thirdRows[8]).getByText('淘汰线')).toBeInTheDocument()
  })
})
