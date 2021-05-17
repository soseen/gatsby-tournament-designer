import { TournamentDetails } from "@/types/TournamentDetails";
import { tiebreakRulesDefault } from '../data/tiebreakRulesDefault'

export const tournamentDetailsInit: TournamentDetails = {
    name: '',
    format: null,
    participants: [
        { name: '' },
        { name: '' }
    ],
    pointsPerWin: 3,
    pointsPerDraw: 1,
    bestOf: null,
    finalsBestOf: null,
    allowDraws: true,
    includeScore: true,
    double: false,
    icon: null,
    tiebreakRules: tiebreakRulesDefault
}