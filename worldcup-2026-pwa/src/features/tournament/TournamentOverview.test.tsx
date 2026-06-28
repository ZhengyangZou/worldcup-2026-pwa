import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TournamentOverview } from './TournamentOverview'
import type { TournamentMetric } from './types'

const metrics: TournamentMetric[] = [
  { id: 'listed', label: '已录入', value: '3' },
  { id: 'live', label: '进行中', value: '1' },
  { id: 'finished', label: '已结束', value: '1' },
  { id: 'upcoming', label: '待开', value: '1' },
]

describe('TournamentOverview', () => {
  it('renders tournament metrics from data', () => {
    render(<TournamentOverview metrics={metrics} />)

    expect(screen.getByRole('heading', { name: '赛事概览' })).toBeInTheDocument()
    expect(screen.getAllByTestId('overview-metric')).toHaveLength(4)

    const metricRows = screen.getAllByTestId('overview-metric')
    metrics.forEach((metric, index) => {
      expect(within(metricRows[index]).getByText(metric.value)).toBeInTheDocument()
      expect(within(metricRows[index]).getByText(metric.label)).toBeInTheDocument()
    })
  })
})
