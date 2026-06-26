interface PlayerAvatarProps {
  name: string
  avatarUrl?: string
  fallbackColor: string
}

export function PlayerAvatar({ name, avatarUrl, fallbackColor }: PlayerAvatarProps) {
  if (avatarUrl) {
    return <img alt={`${name}头像`} className="avatar avatar-image" src={avatarUrl} />
  }

  return (
    <span className="avatar" data-testid="avatar-fallback" style={{ background: fallbackColor }}>
      {name[0]}
    </span>
  )
}
