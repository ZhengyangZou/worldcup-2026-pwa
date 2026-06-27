import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { KnockoutBracket } from './KnockoutBracket'

describe('KnockoutBracket', () => {
  it('exposes a stable navigation anchor', () => {
    render(<KnockoutBracket />)

    expect(screen.getByRole('heading', { name: '淘汰赛对阵图' }).closest('section')).toHaveAttribute('id', '淘汰赛')
  })
})
