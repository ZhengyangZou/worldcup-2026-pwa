import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import App from './App'

const espnScoreboard = {
  events: [
    {
      id: '760486',
      date: '2026-06-28T19:00Z',
      competitions: [
        {
          status: {
            displayClock: "0'",
            type: { state: 'pre', completed: false },
          },
          venue: { fullName: 'SoFi Stadium' },
          competitors: [
            {
              homeAway: 'home',
              score: '0',
              team: { abbreviation: 'RSA', displayName: 'South Africa' },
            },
            {
              homeAway: 'away',
              score: '0',
              team: { abbreviation: 'CAN', displayName: 'Canada' },
            },
          ],
        },
      ],
    },
  ],
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('App', () => {
  it('renders the approved World Cup data center shell', () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))

    render(<App />)

    expect(screen.getByRole('heading', { name: '2026 世界杯 · 比赛日' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '赛程与比分' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '淘汰赛对阵图' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '分组积分' })).toBeInTheDocument()
    expect(screen.getByText('小组第三名排名')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '球员榜' })).toBeInTheDocument()
    expect(screen.getAllByTestId('leader-row')).toHaveLength(20)
  })

  it('automatically replaces fallback matches with ESPN scoreboard data', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: async () => espnScoreboard,
      ok: true,
    }))

    render(<App />)

    expect(await screen.findByText('南非')).toBeInTheDocument()
    expect(screen.getByText('加拿大')).toBeInTheDocument()
    expect(screen.getByText('自动更新 · ESPN')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '刷新最新数据' })).toBeInTheDocument()
  })

  it('keeps local fallback matches when ESPN refresh fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network failed')))

    render(<App />)

    expect(await screen.findByText('本地兜底 · ESPN 暂不可用')).toBeInTheDocument()
    expect(screen.getByText('巴西')).toBeInTheDocument()
  })

  it('refreshes ESPN data again when the refresh button is clicked', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => espnScoreboard,
      ok: true,
    })
    vi.stubGlobal('fetch', fetchMock)

    render(<App />)

    const refreshButton = await screen.findByRole('button', { name: '刷新最新数据' })
    fireEvent.click(refreshButton)

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2)
    })
  })
})
