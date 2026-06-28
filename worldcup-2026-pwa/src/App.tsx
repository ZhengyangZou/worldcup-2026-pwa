import './App.css'

import { useCallback, useEffect, useState } from 'react'

import { HomeHero } from './features/home/HomeHero'
import { MatchdaySummary } from './features/home/MatchdaySummary'
import { matchdaySummary } from './features/home/homeData'
import { buildHomeHeroContent } from './features/home/homeHeroContent'
import { fetchEspnScoreboardMatches } from './features/matches/espnScoreboardApi'
import { KnockoutBracket } from './features/matches/KnockoutBracket'
import { MatchDetailPanel } from './features/matches/MatchDetailPanel'
import { MatchSchedule } from './features/matches/MatchSchedule'
import { matches } from './features/matches/matchData'
import type { Match } from './features/matches/types'
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
import { buildTournamentMetrics } from './features/tournament/tournamentMetrics'
import { AppHeader } from './layout/AppHeader'

const autoRefreshMs = 60_000

type MatchDataState = {
  isRefreshing: boolean
  lastUpdated?: string
  matches: Match[]
  sourceLabel: string
  syncLabel: string
}

function App() {
  const [matchDataState, setMatchDataState] = useState<MatchDataState>({
    isRefreshing: false,
    matches,
    sourceLabel: matchdaySummary.sourceLabel,
    syncLabel: '本地兜底 · ESPN 暂不可用',
  })

  const refreshMatches = useCallback(async () => {
    setMatchDataState((current) => ({ ...current, isRefreshing: true }))

    try {
      const remoteData = await fetchEspnScoreboardMatches()
      setMatchDataState({
        isRefreshing: false,
        lastUpdated: remoteData.lastUpdated,
        matches: remoteData.matches,
        sourceLabel: remoteData.sourceLabel,
        syncLabel: '自动更新 · ESPN',
      })
    } catch {
      setMatchDataState((current) => ({
        ...current,
        isRefreshing: false,
        sourceLabel: current.lastUpdated ? current.sourceLabel : matchdaySummary.sourceLabel,
        syncLabel: current.lastUpdated ? '上次更新 · ESPN 缓存' : '本地兜底 · ESPN 暂不可用',
      }))
    }
  }, [])

  useEffect(() => {
    void refreshMatches()
    const refreshInterval = window.setInterval(() => {
      void refreshMatches()
    }, autoRefreshMs)

    return () => window.clearInterval(refreshInterval)
  }, [refreshMatches])

  const activeMatches = matchDataState.matches
  const homeHero = buildHomeHeroContent(activeMatches)
  const tournamentMetrics = buildTournamentMetrics(activeMatches)

  return (
    <div className="app-shell">
      <AppHeader activeLabel="首页" />

      <main className="content">
        <MatchdaySummary
          {...matchdaySummary}
          isRefreshing={matchDataState.isRefreshing}
          lastUpdated={matchDataState.lastUpdated}
          onRefresh={refreshMatches}
          sourceLabel={matchDataState.sourceLabel}
          syncLabel={matchDataState.syncLabel}
        />

        <div className="dashboard">
          <div className="main-column">
            <HomeHero {...homeHero} />

            <NewsFeed items={newsItems} />

            <MatchSchedule matches={activeMatches} />
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
            {activeMatches.map((match) => (
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
