import { Actions } from "../actions/actions";
import { Action } from "../actions/actionTypes";


const reducer = (state: boolean = false, action: Action) => {
    switch(action.type) {
        case Actions.SET_IS_FETCHING:
            return state = action.payload
        default:
            return state;
    }
}

export default reducer;