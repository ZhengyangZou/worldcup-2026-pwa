import type { MatchdaySummaryContent } from './types'

export function MatchdaySummary({ heading, note, syncLabel }: MatchdaySummaryContent) {
  return (
    <section className="topbar">
      <div>
        <h1>{heading}</h1>
        <p>{note}</p>
      </div>
      <span className="sync">{syncLabel}</span>
    </section>
  )
}
