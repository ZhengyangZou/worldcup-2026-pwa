import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App', () => {
  it('renders the approved World Cup data center shell', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: '2026 世界杯 · 比赛日' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '赛程与比分' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '淘汰赛对阵图' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '分组积分' })).toBeInTheDocument()
    expect(screen.getByText('小组第三名排名')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '球员榜' })).toBeInTheDocument()
    expect(screen.getAllByTestId('scorer-row')).toHaveLength(20)
  })
})
