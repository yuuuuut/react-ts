import { createSelector }   from "reselect"
import { initialStateType } from "../store/initialState"

const productsSelector = (state: initialStateType) => state.products

export const getProducts = createSelector(
    [productsSelector],
    state => state.list
)