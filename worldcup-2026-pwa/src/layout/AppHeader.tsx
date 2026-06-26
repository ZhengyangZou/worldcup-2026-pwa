const navItems = ['首页', '赛程比分', '分组积分', '淘汰赛', '球员榜', '球队']

type AppHeaderProps = {
  activeLabel: string
}

export function AppHeader({ activeLabel }: AppHeaderProps) {
  return (
    <header className="top-nav">
      <div className="brand">
        <span className="logo">26</span>
        <span>世界杯数据中心</span>
      </div>
      <nav className="tabs" aria-label="主导航">
        {navItems.map((item) => (
          <a className={item === activeLabel ? 'active' : ''} href={`#${item}`} key={item}>
            {item}
          </a>
        ))}
      </nav>
    </header>
  )
}
