import { Dispatch } from "redux"
import { Actions } from "./actions"
import { Action } from "./actionTypes"
import { TournamentIcon } from '../../types/TournamentIcon'
import { Contestant } from "@/types/Contestant"
import { TiebreakRule } from "@/types/TiebreakRule"

export const selectFormat = (format: string) => {
    return {
        type: Actions.SELECT_FORMAT,
        payload: format
    }
}

export const updateName = (name: string) => {
    return {
        type: Actions.UPDATE_NAME,
        payload: name
    }
}

export const updateIcon = (icon: TournamentIcon) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: Actions.UPDATE_ICON,
            payload: icon
        })
    }
}

export const updatePointsWin = (pointsPerWin: number) => {
    return {
        type: Actions.UPDATE_POINTS_WIN,
        payload: pointsPerWin
    }
}

export const updatePointsDraw = (pointsPerDraw: number) => {
    return {
        type: Actions.UPDATE_POINTS_DRAW,
        payload: pointsPerDraw
    }
}

export const updateAllowDraws = (allowDraws: boolean) => {
    return {
        type: Actions.UPDATE_ALLOW_DRAWS,
        payload: allowDraws
    }
}

export const updateDoubleRounds = (double: boolean) => {
    return {
        type: Actions.UPDATE_DOUBLE,
        payload: double
    }
}

export const updateIncludePoints = (includePoints: boolean) => {
    return {
        type: Actions.UPDATE_INCLUDE_SCORE,
        payload: includePoints
    }
}

export const updateBestOf = (bestOf: number) => {
    return {
        type: Actions.UPDATE_BEST_OF,
        payload: bestOf
    }
}

export const updateParticipants = (participants: Contestant[]) => {
    return {
        type: Actions.UPDATE_PARTICIPANTS,
        payload: participants
    }
}

export const updateTiebreakRules = (tiebreakRules: TiebreakRule[]) => {
    return {
        type: Actions.UPDATE_TIEBREAK_RULES,
        payload: tiebreakRules
    }
}

export const resetTiebreakRules = () => {
    return {
        type: Actions.RESET_TIEBREAK_RULES,
    }
}