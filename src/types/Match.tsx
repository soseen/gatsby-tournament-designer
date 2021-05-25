import { Contestant } from "./Contestant";

export type Match = {
    id?: number,
    homeSideId: number,
    awaySideId: number,
    scoreHome: number,
    scoreAway: number,
    homeSide?: Contestant,
    awaySide?: Contestant,
    isDraw: boolean,
    isFinished: boolean
}