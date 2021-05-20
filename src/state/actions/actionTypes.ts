import { Actions } from "./actions";
import { TournamentIcon } from '../../types/TournamentIcon'
import { Contestant } from '../../types/Contestant'
import { TiebreakRule } from '../../types/TiebreakRule'
import { IGatsbyImageData } from "gatsby-plugin-image";
import { TournamentDetails } from "@/types/TournamentDetails";

//FETCHING_FLAG
type SetIsFetchingData = {
    type: Actions.SET_IS_FETCHING,
    payload: boolean
}

//TOURNAMENT_DETAILS
type SetTournament = {
    type: Actions.SET_TOURNAMENT,
    payload: TournamentDetails
}

type SelectTournamentFormat = {
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

type UpdateTournamentDoubleRounds = {
    type: Actions.UPDATE_DOUBLE,
    payload: boolean
}

type UpdateTournamentIncludeScore = {
    type: Actions.UPDATE_INCLUDE_SCORE,
    payload: boolean
}

type UpdateTournamentBestOf = {
    type: Actions.UPDATE_BEST_OF,
    payload: number
}

type UpdateTournamentParticipants = {
    type: Actions.UPDATE_PARTICIPANTS,
    payload: Contestant[]
}

type UpdateTournamentTiebreakRules = {
    type: Actions.UPDATE_TIEBREAK_RULES,
    payload: TiebreakRule[]
}

type ResetTournamentTiebreakRules = {
    type: Actions.RESET_TIEBREAK_RULES,
}

//TOURNAMENT_ICONS
type AddTournamentIcons = {
    type: Actions.ADD_T_ICONS,
    payload: TournamentIcon[]
}

//TOURNAMENTS
type LoadTournaments = {
    type: Actions.LOAD_TOURNAMENTS,
    payload: TournamentDetails[]
}

export type Action = 
    SetIsFetchingData |
    SetTournament |
    SelectTournamentFormat |
    UpdateTournamentName | 
    UpdateTournamentIcon | 
    UpdateTournamentPointsWin | 
    UpdateTournamentPointsDraw | 
    UpdateTournamentAllowDraws |
    UpdateTournamentDoubleRounds | 
    UpdateTournamentIncludeScore |
    UpdateTournamentBestOf |
    UpdateTournamentParticipants |
    UpdateTournamentTiebreakRules |
    ResetTournamentTiebreakRules |
    AddTournamentIcons |
    LoadTournaments;