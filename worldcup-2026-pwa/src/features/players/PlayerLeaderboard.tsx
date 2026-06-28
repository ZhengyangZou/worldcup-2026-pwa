import { useState } from 'react'

import { PlayerAvatar } from './PlayerAvatar'
import type { LeaderboardConfig, LeaderboardKind } from './types'

interface PlayerLeaderboardProps {
  leaderboards: LeaderboardConfig[]
}

const topLimit = 20

export function PlayerLeaderboard({ leaderboards }: PlayerLeaderboardProps) {
  const [activeKind, setActiveKind] = useState<LeaderboardKind | undefined>(leaderboards[0]?.kind)

  if (leaderboards.length === 0) {
    return (
      <section className="card" id="球员榜">
        <div className="card-head">
          <div>
            <h2>球员榜</h2>
            <p>等待比赛数据</p>
          </div>
        </div>
        <div className="empty-state">
          <b>暂无球员榜数据</b>
          <span>比赛开始后可补充射手、助攻、扑救等榜单。</span>
        </div>
      </section>
    )
  }

  const activeLeaderboard = leaderboards.find((leaderboard) => leaderboard.kind === activeKind) ?? leaderboards[0]
  const topEntries = activeLeaderboard.entries.slice(0, topLimit)

  return (
    <section className="card" id="球员榜">
      <div className="card-head">
        <div>
          <h2>球员榜</h2>
          <p>{activeLeaderboard.title} Top 20</p>
        </div>
      </div>
      <div className="filters">
        {leaderboards.map((leaderboard) => (
          <button
            className={leaderboard.kind === activeKind ? 'chip active' : 'chip'}
            key={leaderboard.kind}
            onClick={() => setActiveKind(leaderboard.kind)}
            type="button"
          >
            {leaderboard.title}
          </button>
        ))}
      </div>
      <div className="leader-list">
        {topEntries.map((entry, index) => (
          <a
            className="leader-row"
            data-testid="leader-row"
            href="#球员信息"
            key={entry.playerId}
          >
            <span className="rank">{index + 1}</span>
            <PlayerAvatar
              avatarUrl={entry.avatarUrl}
              fallbackColor={entry.fallbackColor}
              name={entry.playerName}
            />
            <span>
              <b>{entry.playerName}</b>
              <small>{entry.teamFlag} {entry.teamName} · {entry.position}</small>
            </span>
            <strong aria-label={`${entry.value}${activeLeaderboard.unit}`}>{entry.value}</strong>
          </a>
        ))}
      </div>
    </section>
  )
}
