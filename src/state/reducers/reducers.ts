import { combineReducers } from "redux";
import tournamentDetailsReducer from './tournamentDetailsReducer';
import tournamentIconsReducer from './tournamentIconsReducer';

const reducers = combineReducers({
    tournamentDetails: tournamentDetailsReducer,
    tournamentIcons: tournamentIconsReducer
})

export default reducers;

export type State = ReturnType<typeof reducers>