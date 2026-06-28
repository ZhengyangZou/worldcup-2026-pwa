import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HomeHero } from './HomeHero'
import type { HeroMetric } from './types'

const metrics: HeroMetric[] = [
  { label: '总比赛', value: '104' },
  { label: '参赛队', value: '48' },
  { label: '小组', value: '12' },
  { label: '决赛日', value: '7/19' },
]

describe('HomeHero', () => {
  it('renders the matchday headline and hero metrics', () => {
    render(
      <HomeHero
        eyebrow="FIFA WORLD CUP 2026"
        metrics={metrics}
        summary="聚合实时比分、赛程、12 组积分、第三名排名、球员榜、新闻和每场比赛的直播/集锦入口。"
        title="今日赛程概览"
      />,
    )

    expect(screen.getByText('FIFA WORLD CUP 2026')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '今日赛程概览' })).toBeInTheDocument()
    expect(screen.getAllByTestId('hero-metric')).toHaveLength(4)
  })
})
