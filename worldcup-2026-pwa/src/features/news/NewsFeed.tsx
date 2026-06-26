import type { NewsItem } from './types'

interface NewsFeedProps {
  items: NewsItem[]
}

export function NewsFeed({ items }: NewsFeedProps) {
  const featured = items.find((item) => item.featured) ?? items[0]
  const listItems = items.filter((item) => item.id !== featured.id)

  return (
    <section className="news-grid" id="新闻">
      <a className="focus-news" data-testid="featured-news" href={featured.href} rel="noreferrer" target="_blank">
        <b>{featured.title}</b>
        <span>{featured.source} · 外链</span>
      </a>
      <div className="news-list">
        {listItems.map((item) => (
          <a data-testid="news-link" href={item.href} key={item.id} rel="noreferrer" target="_blank">
            <small>{item.source}</small>
            <span>{item.title}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
