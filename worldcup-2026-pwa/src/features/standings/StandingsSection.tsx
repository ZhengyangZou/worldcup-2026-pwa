import { rankThirdPlacedTeams } from './thirdPlaceRanking'
import type { GroupStanding, StandingStatus, ThirdPlaceCandidate } from './types'

interface StandingsSectionProps {
  groups: GroupStanding[]
  thirdPlaceCandidates: ThirdPlaceCandidate[]
}

const statusLabels: Record<StandingStatus, string> = {
  advance: '晋级区',
  thirdComparison: '第3比较',
  out: '出局区',
}

const statusClassNames: Record<StandingStatus, string> = {
  advance: 'advance',
  thirdComparison: 'third',
  out: 'out',
}

export function StandingsSection({ groups, thirdPlaceCandidates }: StandingsSectionProps) {
  const thirdPlaceTeams = rankThirdPlacedTeams(thirdPlaceCandidates)

  return (
    <section className="card" id="分组积分">
      <div className="card-head">
        <div>
          <h2>分组积分</h2>
          <p>12 个小组全部展示；前二直接晋级，第三名进入比较</p>
        </div>
      </div>
      <div className="group-grid">
        {groups.map((group) => (
          <div className="group-card" data-testid="group-card" id={`group-${group.code}`} key={group.code}>
            <h3>{group.code} 组</h3>
            {group.teams.map((team, index) => (
              <div className="standing-row" key={team.id}>
                <span>{index + 1}</span>
                <b>
                  <a href="#球队">{team.flag} {team.name}</a>
                </b>
                <span>{team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</span>
                <strong>{team.points}</strong>
                <em className={statusClassNames[team.status]}>{statusLabels[team.status]}</em>
              </div>
            ))}
          </div>
        ))}
        <div className="group-card wide">
          <h3>小组第三名排名</h3>
          {thirdPlaceTeams.map((team) => (
            <div className="standing-row" data-testid="third-place-row" key={team.teamId}>
              <span>{team.rank}</span>
              <b>
                <a href="#球队">{team.flag} {team.teamName}</a>
              </b>
              <span>{team.group}</span>
              <strong>{team.points}</strong>
              <em className={team.advances ? 'advance' : 'out'}>{team.advances ? '晋级' : '淘汰线'}</em>
              <small>{team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
