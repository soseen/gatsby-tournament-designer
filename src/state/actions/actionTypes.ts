import { Actions } from "./actions";

type UpdateTournamentName = {
    type: Actions.UPDATE_NAME,
    payload: string
}

type UpdateTournamentIconAction = {
    type: Actions.UPDATE_ICON,
    payload: number
}

export type Action =  UpdateTournamentName | UpdateTournamentIconAction;