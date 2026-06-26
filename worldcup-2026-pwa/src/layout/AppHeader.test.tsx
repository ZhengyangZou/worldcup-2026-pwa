import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AppHeader } from './AppHeader'

describe('AppHeader', () => {
  it('renders the app brand and main navigation', () => {
    render(<AppHeader activeLabel="首页" />)

    expect(screen.getByText('世界杯数据中心')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: '主导航' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '赛程比分' })).toHaveAttribute('href', '#赛程比分')
    expect(screen.getByRole('link', { name: '首页' })).toHaveClass('active')
  })
})
