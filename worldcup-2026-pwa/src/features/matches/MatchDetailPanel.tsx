import { useState } from 'react'

import type { Match } from './types'

interface MatchDetailPanelProps {
  match: Match
}

const detailTabs = ['赛况', '阵容', '数据', '集锦', '新闻'] as const
type DetailTab = (typeof detailTabs)[number]

const tabNotes: Record<DetailTab, string> = {
  赛况: '关键事件会按比赛时间线手动补充。',
  阵容: '首发和替补名单确认后手动更新。',
  数据: '控球率、射门和角球等数据确认后手动更新。',
  集锦: '集锦入口会优先使用 FIFA 和央视频的具体场次视频。',
  新闻: '相关新闻保持标题、来源和外链，不抓正文。',
}

export function MatchDetailPanel({ match }: MatchDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>('赛况')

  return (
    <section className="card" data-testid="match-detail-panel" id={`match-detail-${match.id}`}>
      <div className="card-head">
        <h2>比赛详情</h2>
      </div>
      <div className="detail-match">
        {match.home.flag} {match.home.name} {match.score} {match.away.flag} {match.away.name}
      </div>
      <div aria-label="比赛详情分类" className="detail-tabs" role="tablist">
        {detailTabs.map((tab) => (
          <button
            aria-selected={tab === activeTab}
            className={tab === activeTab ? 'active' : ''}
            key={tab}
            onClick={() => setActiveTab(tab)}
            role="tab"
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>
      <p className="detail-tab-note">{tabNotes[activeTab]}</p>
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
