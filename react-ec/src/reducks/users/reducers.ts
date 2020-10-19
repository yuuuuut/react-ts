import { ActionTypes } from "../store/actionTypes";
import { initialState } from "../store/initialState"
import { UserState } from "./types";

export const UsersReducer = (state = initialState.users, action: UserState) => {
    switch (action.type) {
        case ActionTypes.signIn:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}