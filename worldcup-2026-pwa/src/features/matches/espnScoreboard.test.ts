import { describe, expect, it } from 'vitest'

import { cctvWorldCupUrl, fifaYoutubeUrl, tdmSportsLiveUrl } from './matchData'
import { mapEspnScoreboardToMatches } from './espnScoreboard'

const scheduledEvent = {
  id: '760486',
  date: '2026-06-28T19:00Z',
  competitions: [
    {
      status: {
        displayClock: "0'",
        type: { state: 'pre', completed: false },
      },
      venue: { fullName: 'SoFi Stadium' },
      competitors: [
        {
          homeAway: 'home',
          score: '0',
          team: { abbreviation: 'RSA', displayName: 'South Africa' },
        },
        {
          homeAway: 'away',
          score: '0',
          team: { abbreviation: 'CAN', displayName: 'Canada' },
        },
      ],
    },
  ],
  links: [
    { href: 'https://www.espn.com/soccer/match/_/gameId/760486/canada-south-africa', text: 'Summary' },
  ],
}

describe('mapEspnScoreboardToMatches', () => {
  it('maps scheduled ESPN events to app match cards with local live links', () => {
    const matches = mapEspnScoreboardToMatches({ events: [scheduledEvent] })

    expect(matches).toEqual([
      {
        id: 'espn-760486',
        time: '03:00',
        venue: 'SoFi Stadium',
        home: { flag: '🇿🇦', name: '南非' },
        score: '-',
        away: { flag: '🇨🇦', name: '加拿大' },
        status: '未开始',
        links: [
          { label: '澳视直播', href: tdmSportsLiveUrl, kind: 'live' },
          { label: '央视频', href: cctvWorldCupUrl, kind: 'live' },
          {
            label: 'ESPN赛况',
            href: 'https://www.espn.com/soccer/match/_/gameId/760486/canada-south-africa',
            kind: 'news',
          },
        ],
      },
    ])
  })

  it('maps in-progress and completed events with the right score and media links', () => {
    const matches = mapEspnScoreboardToMatches({
      events: [
        {
          ...scheduledEvent,
          id: 'live-1',
          competitions: [
            {
              ...scheduledEvent.competitions[0],
              status: {
                displayClock: "68'",
                type: { state: 'in', completed: false },
              },
              competitors: [
                {
                  homeAway: 'home',
                  score: '2',
                  team: { abbreviation: 'BRA', displayName: 'Brazil' },
                },
                {
                  homeAway: 'away',
                  score: '1',
                  team: { abbreviation: 'GER', displayName: 'Germany' },
                },
              ],
            },
          ],
        },
        {
          ...scheduledEvent,
          id: 'done-1',
          competitions: [
            {
              ...scheduledEvent.competitions[0],
              status: {
                displayClock: "90'",
                type: { state: 'post', completed: true },
              },
              competitors: [
                {
                  homeAway: 'home',
                  score: '3',
                  team: { abbreviation: 'ARG', displayName: 'Argentina' },
                },
                {
                  homeAway: 'away',
                  score: '0',
                  team: { abbreviation: 'JPN', displayName: 'Japan' },
                },
              ],
            },
          ],
        },
      ],
    })

    expect(matches[0]).toMatchObject({
      id: 'espn-live-1',
      time: 'LIVE',
      home: { flag: '🇧🇷', name: '巴西' },
      score: '2-1',
      away: { flag: '🇩🇪', name: '德国' },
      status: "68' 进行中",
    })
    expect(matches[0].links.map((link) => link.href)).toContain(tdmSportsLiveUrl)

    expect(matches[1]).toMatchObject({
      id: 'espn-done-1',
      time: '03:00',
      home: { flag: '🇦🇷', name: '阿根廷' },
      score: '3-0',
      away: { flag: '🇯🇵', name: '日本' },
      status: '已结束',
    })
    expect(matches[1].links.map((link) => link.href)).toContain(fifaYoutubeUrl)
  })
})
