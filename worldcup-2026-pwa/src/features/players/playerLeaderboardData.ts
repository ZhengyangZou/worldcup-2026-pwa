import type { LeaderboardConfig, LeaderboardEntry } from './types'

const scorers: LeaderboardEntry[] = [
  ['mbappe', '姆巴佩', '法国', '🇫🇷', '前锋', 5, '#1f4aa8'],
  ['vinicius', '维尼修斯', '巴西', '🇧🇷', '边锋', 4, '#0a7555'],
  ['messi', '梅西', '阿根廷', '🇦🇷', '前锋', 3, '#63a8dc'],
  ['bruno', '布鲁诺·费尔南德斯', '葡萄牙', '🇵🇹', '中场', 3, '#b9152b'],
  ['kane', '哈里·凯恩', '英格兰', '🏴', '前锋', 3, '#243b74'],
  ['lautaro', '劳塔罗', '阿根廷', '🇦🇷', '前锋', 2, '#63a8dc'],
  ['haaland', '哈兰德', '挪威', '🇳🇴', '前锋', 2, '#d22f27'],
  ['bellingham', '贝林厄姆', '英格兰', '🏴', '中场', 2, '#243b74'],
  ['rodrygo', '罗德里戈', '巴西', '🇧🇷', '前锋', 2, '#0a7555'],
  ['salah', '萨拉赫', '埃及', '🇪🇬', '前锋', 2, '#bf2029'],
  ['son', '孙兴慜', '韩国', '🇰🇷', '前锋', 2, '#d81e25'],
  ['lewandowski', '莱万多夫斯基', '波兰', '🇵🇱', '前锋', 2, '#d4213d'],
  ['yamal', '亚马尔', '西班牙', '🇪🇸', '边锋', 1, '#c60b1e'],
  ['pedri', '佩德里', '西班牙', '🇪🇸', '中场', 1, '#c60b1e'],
  ['griezmann', '格列兹曼', '法国', '🇫🇷', '前场', 1, '#1f4aa8'],
  ['musiala', '穆西亚拉', '德国', '🇩🇪', '中场', 1, '#202020'],
  ['mitoma', '三笘薰', '日本', '🇯🇵', '边锋', 1, '#1f4aa8'],
  ['david', '戴维', '加拿大', '🇨🇦', '前锋', 1, '#d52b1e'],
  ['nunez', '努涅斯', '乌拉圭', '🇺🇾', '前锋', 1, '#6bc4e8'],
  ['osimhen', '奥斯梅恩', '尼日利亚', '🇳🇬', '前锋', 1, '#128c45'],
  ['pulisic', '普利西奇', '美国', '🇺🇸', '边锋', 1, '#223a70'],
].map(([playerId, playerName, teamName, teamFlag, position, value, fallbackColor]) => ({
  playerId: String(playerId),
  playerName: String(playerName),
  teamName: String(teamName),
  teamFlag: String(teamFlag),
  position: String(position),
  value: Number(value),
  fallbackColor: String(fallbackColor),
}))

export const leaderboards: LeaderboardConfig[] = [
  {
    kind: 'goals',
    title: '射手榜',
    unit: '球',
    entries: scorers,
  },
  {
    kind: 'assists',
    title: '助攻榜',
    unit: '次',
    entries: scorers.map((entry, index) => ({ ...entry, value: Math.max(1, 5 - Math.floor(index / 4)) })),
  },
  {
    kind: 'saves',
    title: '扑救榜',
    unit: '次',
    entries: scorers.map((entry, index) => ({ ...entry, position: '门将', value: 28 - index })),
  },
  {
    kind: 'yellowCards',
    title: '黄牌榜',
    unit: '张',
    entries: scorers.map((entry, index) => ({ ...entry, value: Math.max(1, 4 - Math.floor(index / 6)) })),
  },
]
