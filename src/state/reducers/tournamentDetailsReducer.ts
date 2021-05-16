import { TournamentDetails } from '../../types/TournamentDetails'
import { Action } from '../actions/actionTypes';
import { Actions} from '../actions/actions';
import { tiebreakRulesDefault } from '../../data/tiebreakRulesDefault'

const tournamentDetailsInit: TournamentDetails = {
    name: '',
    format: null,
    participants: [
        { name: '' },
        { name: '' }
    ],
    pointsPerWin: 3,
    pointsPerDraw: 1,
    bestOf: null,
    finalsBestOf: null,
    allowDraws: true,
    includeScore: true,
    double: false,
    icon: null,
    tiebreakRules: tiebreakRulesDefault
}

const reducer = (state: TournamentDetails = tournamentDetailsInit, action: Action) => {
    switch (action.type) {
        case Actions.SELECT_FORMAT:
            return {...state, format: action.payload}
        case Actions.UPDATE_NAME:
            return {...state, name: action.payload}
        case Actions.UPDATE_ICON:
            return {...state, icon: action.payload}
        case Actions.UPDATE_POINTS_WIN:
            return {...state, pointsPerWin: action.payload}
        case Actions.UPDATE_POINTS_DRAW:
            return {...state, pointsPerDraw: action.payload}
        case Actions.UPDATE_ALLOW_DRAWS:
            return {...state, allowDraws: action.payload}
        case Actions.UPDATE_DOUBLE:
            return {...state, double: action.payload}
        case Actions.UPDATE_INCLUDE_SCORE:
            return {...state, includeScore: action.payload}
        case Actions.UPDATE_BEST_OF:
            return {...state, bestOf: action.payload}
        case Actions.UPDATE_PARTICIPANTS:
            return {...state, participants: action.payload}
        case Actions.UPDATE_TIEBREAK_RULES:
            return {...state, tiebreakRules: action.payload}
        case Actions.RESET_TIEBREAK_RULES:
            return {...state, tiebreakRules: tournamentDetailsInit.tiebreakRules}
        default:
            return state;
    }
}

export default reducer;