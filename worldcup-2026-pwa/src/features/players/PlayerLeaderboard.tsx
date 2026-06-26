import { PlayerAvatar } from './PlayerAvatar'
import type { LeaderboardEntry } from './types'

interface PlayerLeaderboardProps {
  entries: LeaderboardEntry[]
  title: string
  unit: string
}

const leaderboardTabs = ['射手榜', '助攻榜', '扑救榜', '黄牌榜']
const topLimit = 20

export function PlayerLeaderboard({ entries, title, unit }: PlayerLeaderboardProps) {
  const topEntries = entries.slice(0, topLimit)

  return (
    <section className="card" id="球员榜">
      <div className="card-head">
        <div>
          <h2>球员榜</h2>
          <p>{title} Top 20</p>
        </div>
      </div>
      <div className="filters">
        {leaderboardTabs.map((item) => (
          <button className={item === title ? 'chip active' : 'chip'} key={item}>
            {item}
          </button>
        ))}
      </div>
      <div className="leader-list">
        {topEntries.map((entry, index) => (
          <a
            className="leader-row"
            data-testid="leader-row"
            href={`#player-${entry.playerId}`}
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
            <strong aria-label={`${entry.value}${unit}`}>{entry.value}</strong>
          </a>
        ))}
      </div>
    </section>
  )
}
