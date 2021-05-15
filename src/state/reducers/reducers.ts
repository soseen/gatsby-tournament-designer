import { combineReducers } from "redux";
import tournamentDetailsReducer from './tournamentDetailsReducer';

const reducers = combineReducers({
    tournamentDetails: tournamentDetailsReducer
})

export default reducers;

export type State = ReturnType<typeof reducers>