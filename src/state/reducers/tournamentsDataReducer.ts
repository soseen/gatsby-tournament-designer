import { TournamentDetails } from "@/types/TournamentDetails";
import { Actions } from "../actions/actions";
import { Action } from "../actions/actionTypes";


const reducer = (state: null | TournamentDetails[] = null, action: Action) => {
    switch(action.type){
        case Actions.LOAD_TOURNAMENTS:
            return state = action.payload
        case Actions.UPDATE_TOURNAMENTS:
            return state = state.map(tournament => (tournament.id === action.payload.id) ? action.payload : tournament)
        default:
            return state
    }
}

export default reducer;