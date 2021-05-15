export type TournamentDetails = 
    {
        name: string,
        participants: string[],
        pointsPerWin?: number,
        pointsPerDraw?: number,
        bestOf?: number,
        finalsBestOf?: number,
        allowDraws?: boolean,
        includeScore?: boolean,
        double?: boolean,
        iconId?: number
    }