import type { RankedThirdPlaceTeam, ThirdPlaceCandidate } from './types'

export function rankThirdPlacedTeams(
  candidates: ThirdPlaceCandidate[],
): RankedThirdPlaceTeam[] {
  return [...candidates]
    .sort((left, right) => {
      return (
        right.points - left.points ||
        right.goalDifference - left.goalDifference ||
        right.goalsFor - left.goalsFor ||
        right.fairPlayPoints - left.fairPlayPoints ||
        left.group.localeCompare(right.group)
      )
    })
    .map((candidate, index) => ({
      ...candidate,
      rank: index + 1,
      advances: index < 8,
    }))
}
