import type { Match } from './types'

interface MatchDetailPanelProps {
  match: Match
}

const detailTabs = ['赛况', '阵容', '数据', '集锦', '新闻']

export function MatchDetailPanel({ match }: MatchDetailPanelProps) {
  return (
    <section className="card" data-testid="match-detail-panel" id={`match-detail-${match.id}`}>
      <div className="card-head">
        <h2>比赛详情</h2>
      </div>
      <div className="detail-match">
        {match.home.flag} {match.home.name} {match.score} {match.away.flag} {match.away.name}
      </div>
      <div aria-label="比赛详情分类" className="detail-tabs" role="tablist">
        {detailTabs.map((tab, index) => (
          <span
            aria-selected={index === 0}
            className={index === 0 ? 'active' : ''}
            key={tab}
            role="tab"
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="detail-links" aria-label="本场比赛媒体入口">
        {match.links.map((link) => (
          <a href={link.href} key={link.label} rel="noopener noreferrer" target="_blank">
            {link.label}
          </a>
        ))}
      </div>
      <p className="note">直播和集锦以当地版权可用性为准；比赛日前优先替换为具体场次链接。</p>
    </section>
  )
}
