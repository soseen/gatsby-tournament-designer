import { TournamentIcon } from './TournamentIcon'
import { TiebreakRule } from './TiebreakRule'
import { Contestant } from './Contestant'
import { Round } from './Round'

export type TournamentDetails = 
    {
        name: string,
        format?: string,
        participants: Contestant[],
        pointsPerWin?: number,
        pointsPerDraw?: number,
        bestOf?: number,
        finalsBestOf?: number,
        allowDraws?: boolean,
        includeScore?: boolean,
        double?: boolean,
        icon?: TournamentIcon,
        tiebreakRules?: TiebreakRule[],
        rounds?: Round[]
    }