import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TournamentOverview } from './TournamentOverview'
import type { TournamentMetric } from './types'

const metrics: TournamentMetric[] = [
  { id: 'played', label: '已赛', value: '32' },
  { id: 'remaining', label: '待赛', value: '72' },
  { id: 'goals', label: '总进球', value: '91' },
  { id: 'average', label: '场均进球', value: '2.84' },
]

describe('TournamentOverview', () => {
  it('renders tournament metrics from data', () => {
    render(<TournamentOverview metrics={metrics} />)

    expect(screen.getByRole('heading', { name: '赛事概览' })).toBeInTheDocument()
    expect(screen.getAllByTestId('overview-metric')).toHaveLength(4)

    for (const metric of metrics) {
      expect(screen.getByText(metric.value)).toBeInTheDocument()
      expect(screen.getByText(metric.label)).toBeInTheDocument()
    }
  })
})
