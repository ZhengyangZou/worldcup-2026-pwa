import type { TeamProfile } from './types'

type TeamProfileCardProps = {
  profile: TeamProfile
}

export function TeamProfileCard({ profile }: TeamProfileCardProps) {
  return (
    <section className="card profile-card" data-testid="team-profile" id={`team-${profile.id}`}>
      <div className="card-head">
        <div>
          <h2>球队信息</h2>
          <p>从积分榜点击后定位到这里</p>
        </div>
        <span className="pill">{profile.status}</span>
      </div>
      <div className="team-profile-body">
        <b>{profile.flag} {profile.name}</b>
        <span>{profile.group} 组 · FIFA 第 {profile.fifaRank} · {profile.coach}</span>
        <p>{profile.summary}</p>
      </div>
    </section>
  )
}
