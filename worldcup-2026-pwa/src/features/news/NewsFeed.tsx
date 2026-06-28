import type { NewsItem } from './types'

interface NewsFeedProps {
  items: NewsItem[]
}

export function NewsFeed({ items }: NewsFeedProps) {
  if (items.length === 0) {
    return (
      <section className="news-grid news-empty" id="新闻">
        <div className="focus-news empty-state">
          <b>暂无新闻外链</b>
          <span>比赛日前可手动补充 FIFA、央视或可信媒体链接。</span>
        </div>
      </section>
    )
  }

  const featured = items.find((item) => item.featured) ?? items[0]
  const listItems = items.filter((item) => item.id !== featured.id)

  return (
    <section className="news-grid" id="新闻">
      <a className="focus-news" data-testid="featured-news" href={featured.href} rel="noopener noreferrer" target="_blank">
        <b>{featured.title}</b>
        <span>{featured.source} · 外链</span>
      </a>
      <div className="news-list">
        {listItems.map((item) => (
          <a data-testid="news-link" href={item.href} key={item.id} rel="noopener noreferrer" target="_blank">
            <small>{item.source}</small>
            <span>{item.title}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
