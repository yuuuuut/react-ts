import { ActionTypes } from "../store/actionTypes";
import { initialState } from "../store/initialState"
import { UserState } from "./types";

export const ProductsReducer = (state = initialState.products, action: UserState) => {
    switch (action.type) {
        default:
            return state
    }
}