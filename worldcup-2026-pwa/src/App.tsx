import './App.css'

import { HomeHero } from './features/home/HomeHero'
import { MatchdaySummary } from './features/home/MatchdaySummary'
import { homeHero, matchdaySummary } from './features/home/homeData'
import { KnockoutBracket } from './features/matches/KnockoutBracket'
import { MatchDetailPanel } from './features/matches/MatchDetailPanel'
import { MatchSchedule } from './features/matches/MatchSchedule'
import { matches } from './features/matches/matchData'
import { NewsFeed } from './features/news/NewsFeed'
import { newsItems } from './features/news/newsData'
import { PlayerLeaderboard } from './features/players/PlayerLeaderboard'
import { leaderboards } from './features/players/playerLeaderboardData'
import { StandingsSection } from './features/standings/StandingsSection'
import { groupStandings, thirdPlaceCandidates } from './features/standings/standingsData'
import { TournamentOverview } from './features/tournament/TournamentOverview'
import { tournamentMetrics } from './features/tournament/tournamentData'
import { AppHeader } from './layout/AppHeader'

function App() {
  const primaryLeaderboard = leaderboards[0]

  return (
    <div className="app-shell">
      <AppHeader activeLabel="首页" />

      <main className="content">
        <MatchdaySummary {...matchdaySummary} />

        <div className="dashboard">
          <div className="main-column">
            <HomeHero {...homeHero} />

            <NewsFeed items={newsItems} />

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
            <TournamentOverview metrics={tournamentMetrics} />
            <MatchDetailPanel match={matches[0]} />
          </aside>
        </div>
      </main>
    </div>
  )
}

export default App
