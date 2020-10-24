import { ActionTypes }  from "../store/actionTypes";
import { initialState } from "../store/initialState"

export const ProductsReducer = (state = initialState.products, action: any) => {
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