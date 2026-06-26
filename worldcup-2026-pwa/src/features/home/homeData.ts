import type { HomeHeroContent, MatchdaySummaryContent } from './types'

export const matchdaySummary: MatchdaySummaryContent = {
  heading: '2026 世界杯 · 比赛日',
  note: '北京时间显示 · 为手机和 PC 分发优化',
  syncLabel: '实时数据 · 18:42 已刷新',
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
  title: '今天 3 场比赛，1 场正在进行',
}
