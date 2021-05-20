import { combineReducers } from "redux";
import tournamentDetailsReducer from './tournamentDetailsReducer';
import tournamentIconsReducer from './tournamentIconsReducer';
import isFetchingDataReducer from './isFetchingDataReducer';
import tournamentsDataReducer from './tournamentsDataReducer'

const reducers = combineReducers({
    tournamentDetails: tournamentDetailsReducer,
    tournamentIcons: tournamentIconsReducer,
    isFetchingData: isFetchingDataReducer,
    tournamentsData: tournamentsDataReducer
})

export default reducers;

export type State = ReturnType<typeof reducers>