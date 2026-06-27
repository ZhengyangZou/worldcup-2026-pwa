import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MatchdaySummary } from './MatchdaySummary'

describe('MatchdaySummary', () => {
  it('exposes the home navigation anchor', () => {
    render(
      <MatchdaySummary
        heading="2026 世界杯 · 比赛日"
        note="北京时间显示 · 为手机和 PC 分发优化"
        syncLabel="实时数据 · 18:42 已刷新"
      />,
    )

    expect(screen.getByRole('heading', { name: '2026 世界杯 · 比赛日' }).closest('section')).toHaveAttribute('id', '首页')
  })
})
