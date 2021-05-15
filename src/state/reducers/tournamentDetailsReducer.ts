import { TournamentDetails } from '../../types/TournamentDetails'
import { Action } from '../actions/actionTypes';
import { Actions} from '../actions/actions';

const tournamentDetailsInit: TournamentDetails = {
    name: '',
    participants: [],
    pointsPerWin: 3,
    pointsPerDraw: 1,
    bestOf: null,
    finalsBestOf: null,
    allowDraws: true,
    includeScore: true,
    iconId: null
}

const reducer = (state: TournamentDetails = tournamentDetailsInit, action: Action) => {
    switch (action.type) {
        case Actions.UPDATE_NAME:
            return {...state, name: action.payload}
        case Actions.UPDATE_ICON:
            return {...state, iconId: action.payload}
        default:
            return state;
    }
}

export default reducer;