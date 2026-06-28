import type { HomeHeroContent, MatchdaySummaryContent } from './types'

export const matchdaySummary: MatchdaySummaryContent = {
  heading: '2026 世界杯 · 比赛日',
  note: '北京时间显示 · 为手机和 PC 分发优化',
  sourceLabel: '来源：FIFA / 央视 / 澳视 / YouTube 官方频道',
  syncLabel: '手动更新 · 本地资料库',
}

export const homeHero: HomeHeroContent = {
  eyebrow: 'FIFA WORLD CUP 2026',
  metrics: [
    { label: '总比赛', value: '104' },
    { label: '参赛队', value: '48' },
    { label: '小组', value: '12' },
    { label: '决赛日', value: '7/19' },
  ],
  summary: '聚合实时比分、赛程、12 组积分、第三名排名、球员榜、新闻和每场比赛的直播/集锦入口。',
  title: '今日赛程概览',
}
