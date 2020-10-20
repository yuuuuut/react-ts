import { ActionTypes } from "../store/actionTypes";
import { initialState } from "../store/initialState"

export const ProductsReducer = (state = initialState.products, action: any) => {
    switch (action.type) {
        default:
            return state
    }
}