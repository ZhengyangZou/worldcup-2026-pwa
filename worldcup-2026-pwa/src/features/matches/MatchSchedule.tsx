import type { Match } from './types'

interface MatchScheduleProps {
  matches: Match[]
}

const scheduleFilters = ['今日', '小组赛', '淘汰赛对阵图', '16 强', '半决赛', '决赛']

export function MatchSchedule({ matches }: MatchScheduleProps) {
  return (
    <section className="card" id="赛程比分">
      <div className="card-head">
        <div>
          <h2>赛程与比分</h2>
          <p>每场比赛内提供直播或集锦入口</p>
        </div>
        <span className="pill">{matches.length} 场</span>
      </div>
      <div className="filters">
        {scheduleFilters.map((item, index) => (
          <button className={index === 0 ? 'chip active' : 'chip'} key={item}>
            {item}
          </button>
        ))}
      </div>
      <div className="match-list">
        {matches.map((match) => (
          <article
            className="match-card"
            data-testid="match-card"
            id={`match-${match.id}`}
            key={match.id}
          >
            <a aria-label={`查看${match.home.name}对${match.away.name}赛况`} className="match-card-link" href={`#match-${match.id}`}>
              <span className="time">
                <strong>{match.time}</strong>
                <small>{match.venue}</small>
              </span>
              <span className="team"><span>{match.home.flag}</span>{match.home.name}</span>
              <span className="score">{match.score}</span>
              <span className="team right">{match.away.name}<span>{match.away.flag}</span></span>
            </a>
            <div className="match-actions">
              <small>{match.status}</small>
              <div>
                {match.links.map((link) => (
                  <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
