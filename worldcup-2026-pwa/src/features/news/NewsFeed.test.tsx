import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NewsFeed } from './NewsFeed'
import type { NewsItem } from './types'

const news: NewsItem[] = [
  {
    id: 'bra-ger-live',
    title: '巴西 2-1 暂时领先德国，维尼修斯边路连续制造威胁',
    source: '实时战报',
    href: 'https://www.fifa.com/',
    featured: true,
  },
  {
    id: 'fra-mex-preview',
    title: '法国今晚迎战墨西哥，姆巴佩预计首发出场',
    source: 'FIFA',
    href: 'https://www.fifa.com/',
  },
  {
    id: 'arg-jpn-report',
    title: '阿根廷 3-0 完胜日本，梅西传射建功',
    source: 'ESPN',
    href: 'https://www.espn.com/soccer/',
  },
]

describe('NewsFeed', () => {
  it('renders headline, sources, and external links without article body text', () => {
    render(<NewsFeed items={news} />)

    const featured = screen.getByTestId('featured-news')
    expect(featured).toHaveAttribute('rel', 'noopener noreferrer')
    expect(within(featured).getByText(news[0].title)).toBeInTheDocument()
    expect(within(featured).getByText('实时战报 · 外链')).toBeInTheDocument()

    const links = screen.getAllByTestId('news-link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', 'https://www.fifa.com/')
    expect(links[0]).toHaveAttribute('rel', 'noopener noreferrer')
    expect(within(links[0]).getByText('FIFA')).toBeInTheDocument()
    expect(within(links[0]).getByText(news[1].title)).toBeInTheDocument()

    expect(screen.queryByText('正文')).not.toBeInTheDocument()
  })
})
