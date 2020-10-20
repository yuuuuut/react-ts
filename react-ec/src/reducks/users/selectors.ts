import { createSelector } from "reselect"

type SelectorState = {
    users: {
        uid: string
        isSignedIn: boolean 
    }
}

const usersSelector = (state: SelectorState) => state.users

export const getIsSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
)

export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
)