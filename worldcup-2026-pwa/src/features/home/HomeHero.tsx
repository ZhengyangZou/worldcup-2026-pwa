import type { HomeHeroContent } from './types'

export function HomeHero({ eyebrow, metrics, summary, title }: HomeHeroContent) {
  return (
    <section className="hero-card">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{summary}</p>
      <div className="hero-stats">
        {metrics.map((metric) => (
          <b data-testid="hero-metric" key={`${metric.label}-${metric.value}`}>
            {metric.value}
            <span>{metric.label}</span>
          </b>
        ))}
      </div>
    </section>
  )
}
