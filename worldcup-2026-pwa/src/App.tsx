import './App.css'

import { KnockoutBracket } from './features/matches/KnockoutBracket'
import { MatchDetailPanel } from './features/matches/MatchDetailPanel'
import { MatchSchedule } from './features/matches/MatchSchedule'
import { matches } from './features/matches/matchData'

const groups = Array.from({ length: 12 }, (_, index) => {
  const code = String.fromCharCode(65 + index)
  const teams = [
    ['🇲🇽', '墨西哥', 6, '+4', '晋级区'],
    ['🇰🇷', '韩国', 4, '+1', '晋级区'],
    ['🇯🇵', '日本', 3, '-1', '第3比较'],
    ['🇿🇦', '南非', 1, '-2', '出局区'],
  ]

  return { code, teams }
})

const scorers = [
  ['姆巴佩', '🇫🇷 法国 · 前锋', '5', '姆'],
  ['维尼修斯', '🇧🇷 巴西 · 边锋', '4', '维'],
  ['梅西', '🇦🇷 阿根廷 · 前锋', '3', '梅'],
  ['布鲁诺·费尔南德斯', '🇵🇹 葡萄牙 · 中场', '3', 'B'],
  ['哈里·凯恩', '🏴 英格兰 · 前锋', '3', '凯'],
  ['劳塔罗', '🇦🇷 阿根廷 · 前锋', '2', '劳'],
  ['哈兰德', '🇳🇴 挪威 · 前锋', '2', '哈'],
  ['贝林厄姆', '🏴 英格兰 · 中场', '2', '贝'],
  ['罗德里戈', '🇧🇷 巴西 · 前锋', '2', '罗'],
  ['萨拉赫', '🇪🇬 埃及 · 前锋', '2', '萨'],
  ['孙兴慜', '🇰🇷 韩国 · 前锋', '2', '孙'],
  ['莱万多夫斯基', '🇵🇱 波兰 · 前锋', '2', '莱'],
  ['亚马尔', '🇪🇸 西班牙 · 边锋', '1', '亚'],
  ['佩德里', '🇪🇸 西班牙 · 中场', '1', '佩'],
  ['格列兹曼', '🇫🇷 法国 · 前场', '1', '格'],
  ['穆西亚拉', '🇩🇪 德国 · 中场', '1', '穆'],
  ['三笘薰', '🇯🇵 日本 · 边锋', '1', '三'],
  ['戴维', '🇨🇦 加拿大 · 前锋', '1', '戴'],
  ['努涅斯', '🇺🇾 乌拉圭 · 前锋', '1', '努'],
  ['奥斯梅恩', '🇳🇬 尼日利亚 · 前锋', '1', '奥'],
]

const thirdPlaceTeams = [
  ['🇯🇵 日本', 'B', '3', '-1', true],
  ['🇨🇭 瑞士', 'E', '3', '0', true],
  ['🇨🇲 喀麦隆', 'G', '3', '-1', true],
  ['🇵🇱 波兰', 'H', '3', '-1', true],
  ['🇺🇦 乌克兰', 'J', '3', '0', true],
  ['🇵🇾 巴拉圭', 'K', '3', '0', true],
  ['🇨🇮 科特迪瓦', 'L', '3', '0', true],
  ['🇲🇦 摩洛哥', 'D', '3', '-1', true],
  ['🇺🇸 美国', 'C', '2', '0', false],
  ['🇭🇷 克罗地亚', 'F', '2', '0', false],
  ['🇬🇭 加纳', 'I', '2', '0', false],
  ['🇿🇦 南非', 'A', '1', '-2', false],
]

function App() {
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
              <section className="card">
                <div className="card-head">
                  <div>
                    <h2>分组积分</h2>
                    <p>12 个小组全部展示；前二直接晋级，第三名进入比较</p>
                  </div>
                </div>
                <div className="group-grid">
                  {groups.map((group) => (
                    <div className="group-card" key={group.code}>
                      <h3>{group.code} 组</h3>
                      {group.teams.map(([flag, name, points, goalDiff, status], index) => (
                        <div className="standing-row" key={`${group.code}-${name}`}>
                          <span>{index + 1}</span>
                          <b>{flag} {name}</b>
                          <span>{goalDiff}</span>
                          <strong>{points}</strong>
                          <em className={status === '晋级区' ? 'advance' : status === '第3比较' ? 'third' : 'out'}>{status}</em>
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="group-card wide">
                    <h3>小组第三名排名</h3>
                    {thirdPlaceTeams.map(([team, group, points, goalDiff, advances], index) => (
                      <div className="standing-row" key={`${team}`}>
                        <span>{index + 1}</span>
                        <b>{team}</b>
                        <span>{group}</span>
                        <strong>{points}</strong>
                        <em className={advances ? 'advance' : 'out'}>{advances ? '晋级' : '淘汰线'}</em>
                        <small>{goalDiff}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="card">
                <div className="card-head">
                  <div>
                    <h2>球员榜</h2>
                    <p>当前榜单展示 Top 20；切换后展示对应榜单 Top 20</p>
                  </div>
                </div>
                <div className="filters">
                  {['射手榜', '助攻榜', '扑救榜', '黄牌榜'].map((item, index) => (
                    <button className={index === 0 ? 'chip active' : 'chip'} key={item}>
                      {item}
                    </button>
                  ))}
                </div>
                <div className="leader-list">
                  {scorers.map(([name, team, goals, avatar], index) => (
                    <a data-testid="scorer-row" className="leader-row" href="#player" key={`${name}-${index}`}>
                      <span className="rank">{index + 1}</span>
                      <span className="avatar">{avatar}</span>
                      <span>
                        <b>{name}</b>
                        <small>{team}</small>
                      </span>
                      <strong>{goals}</strong>
                    </a>
                  ))}
                </div>
              </section>
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
