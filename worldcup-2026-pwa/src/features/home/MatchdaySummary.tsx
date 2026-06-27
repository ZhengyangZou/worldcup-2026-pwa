import type { MatchdaySummaryContent } from './types'

export function MatchdaySummary({ heading, note, syncLabel }: MatchdaySummaryContent) {
  return (
    <section className="topbar" id="首页">
      <div>
        <h1>{heading}</h1>
        <p>{note}</p>
      </div>
      <span className="sync">{syncLabel}</span>
    </section>
  )
}
