import { tournamentIconsInit } from "@/data/tournamentIconsInit";
import { TournamentIcon } from "@/types/TournamentIcon";
import { Actions } from "../actions/actions";
import { Action } from "../actions/actionTypes";


const reducer = (state: TournamentIcon[] = tournamentIconsInit,  action: Action) => {
    switch(action.type) {
        case Actions.ADD_T_ICONS:
            return state = action.payload
        default:
            return state;
    }
}

export default reducer;