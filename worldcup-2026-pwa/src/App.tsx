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
import { PlayerProfileCard } from './features/players/PlayerProfileCard'
import { leaderboards } from './features/players/playerLeaderboardData'
import { featuredPlayer } from './features/players/playerProfileData'
import { StandingsSection } from './features/standings/StandingsSection'
import { groupStandings, thirdPlaceCandidates } from './features/standings/standingsData'
import { TeamProfileCard } from './features/teams/TeamProfileCard'
import { featuredTeam } from './features/teams/teamProfileData'
import { TournamentOverview } from './features/tournament/TournamentOverview'
import { tournamentMetrics } from './features/tournament/tournamentData'
import { AppHeader } from './layout/AppHeader'

function App() {
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
                leaderboards={leaderboards}
              />
            </div>
          </div>

          <aside className="side-column">
            <TournamentOverview metrics={tournamentMetrics} />
            {matches.map((match) => (
              <MatchDetailPanel key={match.id} match={match} />
            ))}
            <PlayerProfileCard profile={featuredPlayer} />
            <TeamProfileCard profile={featuredTeam} />
          </aside>
        </div>
      </main>
    </div>
  )
}

export default App
