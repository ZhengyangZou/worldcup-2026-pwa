export type HeroMetric = {
  label: string
  value: string
}

export type HomeHeroContent = {
  eyebrow: string
  metrics: HeroMetric[]
  summary: string
  title: string
}

export type MatchdaySummaryContent = {
  heading: string
  note: string
  sourceLabel: string
  syncLabel: string
}
