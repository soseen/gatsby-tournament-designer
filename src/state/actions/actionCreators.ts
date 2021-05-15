import { Dispatch } from "redux"
import { Actions } from "./actions"
import { Action } from "./actionTypes"


export const updateName = (name: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: Actions.UPDATE_NAME,
            payload: name
        })
    }
}

export const updateIcon = (iconId: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: Actions.UPDATE_ICON,
            payload: iconId
        })
    }
}