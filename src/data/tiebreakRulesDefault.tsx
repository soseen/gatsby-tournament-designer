import { TiebreakRule } from "@/types/TiebreakRule";

export const tiebreakRulesDefault: TiebreakRule[] = [
    {
        name: 'Head to head',
        priority: 1,
        desc: 'direct score between players'
    },
    {
        name: 'Sonneborn-Berger',
        priority: 2,
        desc: 'added scores of the opponents beaten by a player and if possible half the scores of players he drew with'
    },
    {
        name: 'Buchholz System',
        priority: 3,
        desc: 'added score of all the opponents a player faced'
    },
    {
        name: 'Most wins',
        priority: 4,
        desc: 'highest number of wins determines a champion'
    },
    {
        name: 'Score differential',
        priority: 5,
        desc: 'all points scored by a player subtracted by points against'
    },
    {
        name: 'Tiebreak game',
        priority: 6,
        desc: 'additional game to determine a winner'
    },
    {
        name: 'Coin toss',
        priority: 7,
        desc: 'good old way to settle the score'
    }
]