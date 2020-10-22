import { createSelector } from "reselect"
import { AuthUsersType }  from '../../Auth'

const usersSelector = (state: AuthUsersType) => state.users

export const getIsSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
)

export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
)