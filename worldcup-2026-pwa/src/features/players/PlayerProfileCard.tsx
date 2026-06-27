import { PlayerAvatar } from './PlayerAvatar'
import type { PlayerProfile } from './types'

type PlayerProfileCardProps = {
  profile: PlayerProfile
}

export function PlayerProfileCard({ profile }: PlayerProfileCardProps) {
  return (
    <section className="card profile-card" data-testid="player-profile" id={`player-${profile.id}`}>
      <span className="anchor-target" data-testid="player-info-anchor" id="球员信息" />
      <div className="card-head">
        <div>
          <h2>球员信息</h2>
          <p>从球员榜点击后定位到这里</p>
        </div>
      </div>
      <div className="profile-body">
        <PlayerAvatar
          avatarUrl={profile.avatarUrl}
          fallbackColor={profile.fallbackColor}
          name={profile.name}
        />
        <div>
          <b>{profile.name}</b>
          <span>{profile.teamFlag} {profile.teamName} · {profile.position} · {profile.age}岁</span>
          <p>{profile.keyStat}</p>
        </div>
      </div>
    </section>
  )
}
