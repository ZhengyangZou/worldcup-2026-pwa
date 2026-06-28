import type { MatchdaySummaryActions, MatchdaySummaryContent } from './types'

type MatchdaySummaryProps = MatchdaySummaryActions & MatchdaySummaryContent

export function MatchdaySummary({
  heading,
  isRefreshing = false,
  lastUpdated,
  note,
  onRefresh,
  sourceLabel,
  syncLabel,
}: MatchdaySummaryProps) {
  return (
    <section className="topbar" id="首页">
      <div>
        <h1>{heading}</h1>
        <p>{note}</p>
        <small className="source-label">{sourceLabel}</small>
      </div>
      <div className="sync-actions">
        {lastUpdated ? <small>最后更新 {lastUpdated}</small> : null}
        <span className="sync">{syncLabel}</span>
        {onRefresh ? (
          <button className="refresh-button" disabled={isRefreshing} onClick={onRefresh} type="button">
            {isRefreshing ? '刷新中' : '刷新最新数据'}
          </button>
        ) : null}
      </div>
    </section>
  )
}
