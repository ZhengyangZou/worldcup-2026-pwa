import type { Match } from './types'

export const tdmSportsLiveUrl = 'https://www.tdm.com.mo/zh-hant/live?Channel=6&type=tv'
export const cctvWorldCupUrl = 'https://worldcup.cctv.com/'
export const fifaYoutubeUrl = 'https://www.youtube.com/@fifa'

export const matches: Match[] = [
  {
    id: 'bra-ger',
    time: 'LIVE',
    venue: 'MetLife Stadium',
    home: { flag: '🇧🇷', name: '巴西' },
    score: '2-1',
    away: { flag: '🇩🇪', name: '德国' },
    status: "68' 进行中",
    links: [
      { label: '澳视直播', href: tdmSportsLiveUrl, kind: 'live' },
      { label: '央视频', href: cctvWorldCupUrl, kind: 'live' },
    ],
  },
  {
    id: 'mex-fra',
    time: '23:00',
    venue: 'Azteca',
    home: { flag: '🇲🇽', name: '墨西哥' },
    score: '-',
    away: { flag: '🇫🇷', name: '法国' },
    status: '未开始',
    links: [
      { label: '澳视直播', href: tdmSportsLiveUrl, kind: 'live' },
      { label: '央视频', href: cctvWorldCupUrl, kind: 'live' },
    ],
  },
  {
    id: 'arg-jpn',
    time: '02:00',
    venue: 'BC Place',
    home: { flag: '🇦🇷', name: '阿根廷' },
    score: '3-0',
    away: { flag: '🇯🇵', name: '日本' },
    status: '已结束',
    links: [
      { label: 'FIFA集锦', href: fifaYoutubeUrl, kind: 'highlight' },
      { label: '央视频集锦', href: cctvWorldCupUrl, kind: 'highlight' },
    ],
  },
]
