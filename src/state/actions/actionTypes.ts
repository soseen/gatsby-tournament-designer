import { Actions } from "./actions";
import { TournamentIcon } from '../../types/TournamentIcon'
import { Contestant } from '../../types/Contestant'
import { TiebreakRule } from '../../types/TiebreakRule'
import { IGatsbyImageData } from "gatsby-plugin-image";
import { TournamentDetails } from "@/types/TournamentDetails";

//TOURNAMENT_DETAILS
type setTournament = {
    type: Actions.SET_TOURNAMENT,
    payload: TournamentDetails
}

type selectTournamentFormat = {
    type: Actions.SELECT_FORMAT,
    payload: string
}

type UpdateTournamentName = {
    type: Actions.UPDATE_NAME,
    payload: string
}

type UpdateTournamentIcon = {
    type: Actions.UPDATE_ICON,
    payload: number
}

type UpdateTournamentPointsWin = {
    type: Actions.UPDATE_POINTS_WIN,
    payload: number
}

type UpdateTournamentPointsDraw = {
    type: Actions.UPDATE_POINTS_DRAW,
    payload: number
}

type UpdateTournamentAllowDraws = {
    type: Actions.UPDATE_ALLOW_DRAWS,
    payload: boolean
}

type updateTournamentDoubleRounds = {
    type: Actions.UPDATE_DOUBLE,
    payload: boolean
}

type UpdateTournamentIncludeScore = {
    type: Actions.UPDATE_INCLUDE_SCORE,
    payload: boolean
}

type updateTournamentBestOf = {
    type: Actions.UPDATE_BEST_OF,
    payload: number
}

type updateTournamentParticipants = {
    type: Actions.UPDATE_PARTICIPANTS,
    payload: Contestant[]
}

type updateTournamentTiebreakRules = {
    type: Actions.UPDATE_TIEBREAK_RULES,
    payload: TiebreakRule[]
}

type resetTournamentTiebreakRules = {
    type: Actions.RESET_TIEBREAK_RULES,
}

//TOURNAMENT_ICONS
type addTournamentIcons = {
    type: Actions.ADD_T_ICONS,
    payload: TournamentIcon[]
}


export type Action = 
    setTournament |
    selectTournamentFormat |
    UpdateTournamentName | 
    UpdateTournamentIcon | 
    UpdateTournamentPointsWin | 
    UpdateTournamentPointsDraw | 
    UpdateTournamentAllowDraws |
    updateTournamentDoubleRounds | 
    UpdateTournamentIncludeScore |
    updateTournamentBestOf |
    updateTournamentParticipants |
    updateTournamentTiebreakRules |
    resetTournamentTiebreakRules |
    addTournamentIcons;