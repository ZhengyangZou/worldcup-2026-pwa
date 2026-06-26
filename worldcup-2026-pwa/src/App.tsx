import './App.css'

import { KnockoutBracket } from './features/matches/KnockoutBracket'
import { MatchDetailPanel } from './features/matches/MatchDetailPanel'
import { MatchSchedule } from './features/matches/MatchSchedule'
import { matches } from './features/matches/matchData'
import { PlayerLeaderboard } from './features/players/PlayerLeaderboard'
import { leaderboards } from './features/players/playerLeaderboardData'
import { StandingsSection } from './features/standings/StandingsSection'
import { groupStandings, thirdPlaceCandidates } from './features/standings/standingsData'

function App() {
  const primaryLeaderboard = leaderboards[0]

  return (
    <div className="app-shell">
      <header className="top-nav">
        <div className="brand">
          <span className="logo">26</span>
          <span>世界杯数据中心</span>
        </div>
        <nav className="tabs" aria-label="主导航">
          {['首页', '赛程比分', '分组积分', '淘汰赛', '球员榜', '球队'].map((item, index) => (
            <a className={index === 0 ? 'active' : ''} href={`#${item}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
      </header>

      <main className="content">
        <section className="topbar">
          <div>
            <h1>2026 世界杯 · 比赛日</h1>
            <p>北京时间显示 · 为手机和 PC 分发优化</p>
          </div>
          <span className="sync">实时数据 · 18:42 已刷新</span>
        </section>

        <div className="dashboard">
          <div className="main-column">
            <section className="hero-card">
              <span className="eyebrow">FIFA WORLD CUP 2026</span>
              <h2>今天 3 场比赛，1 场正在进行</h2>
              <p>聚合实时比分、赛程、12 组积分、第三名排名、球员榜、新闻和每场比赛的直播/集锦入口。</p>
              <div className="hero-stats">
                <b>104<span>总比赛</span></b>
                <b>48<span>参赛队</span></b>
                <b>12<span>小组</span></b>
                <b>7/19<span>决赛日</span></b>
              </div>
            </section>

            <section className="news-grid">
              <article className="focus-news">
                <b>巴西 2-1 暂时领先德国，维尼修斯边路连续制造威胁</b>
                <span>实时战报 · 关键事件 · 技术统计同步更新</span>
              </article>
              <div className="news-list">
                <a href="https://www.fifa.com/" target="_blank">法国今晚迎战墨西哥，姆巴佩预计首发出场</a>
                <a href="https://www.espn.com/soccer/" target="_blank">阿根廷 3-0 完胜日本，梅西传射建功</a>
                <a href="https://worldcup.cctv.com/" target="_blank">淘汰赛席位形势：A 组前两名基本明朗</a>
              </div>
            </section>

            <MatchSchedule matches={matches} />
            <KnockoutBracket />

            <div className="two-col">
              <StandingsSection groups={groupStandings} thirdPlaceCandidates={thirdPlaceCandidates} />

              <PlayerLeaderboard
                entries={primaryLeaderboard.entries}
                title={primaryLeaderboard.title}
                unit={primaryLeaderboard.unit}
              />
            </div>
          </div>

          <aside className="side-column">
            <section className="card">
              <div className="card-head">
                <h2>赛事概览</h2>
              </div>
              <div className="overview">
                <b>32<span>已赛</span></b>
                <b>72<span>待赛</span></b>
                <b>91<span>总进球</span></b>
                <b>2.84<span>场均进球</span></b>
              </div>
            </section>
            <MatchDetailPanel match={matches[0]} />
          </aside>
        </div>
      </main>
    </div>
  )
}

export default App
