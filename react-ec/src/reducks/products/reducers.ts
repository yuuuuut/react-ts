import { ActionTypes }  from "../store/actionTypes";
import { initialState } from "../store/initialState"
import { ProductState } from "./types";

export const ProductsReducer = (state = initialState.products, action: ProductState) => {
    switch (action.type) {
        case ActionTypes.fetchProducts:
            return {
                ...state,
                list: [...action.payload]
            }
        case ActionTypes.deleteProduct:
            return {
                ...state,
                list: [...action.payload]
            }
        default:
            return state
    }
}