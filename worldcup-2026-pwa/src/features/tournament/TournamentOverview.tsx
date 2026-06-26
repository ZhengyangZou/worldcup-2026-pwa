import type { TournamentMetric } from './types'

interface TournamentOverviewProps {
  metrics: TournamentMetric[]
}

export function TournamentOverview({ metrics }: TournamentOverviewProps) {
  return (
    <section className="card">
      <div className="card-head">
        <h2>赛事概览</h2>
      </div>
      <div className="overview">
        {metrics.map((metric) => (
          <b data-testid="overview-metric" key={metric.id}>
            {metric.value}
            <span>{metric.label}</span>
          </b>
        ))}
      </div>
    </section>
  )
}
