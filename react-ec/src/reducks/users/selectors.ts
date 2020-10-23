import { createSelector }   from "reselect"
import { initialStateType } from '../store/initialState'

const usersSelector = (state: initialStateType) => state.users

export const getIsSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
)

export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
)

export const getProductsInCart = createSelector(
    [usersSelector],
    state => state.cart
)