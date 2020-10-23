import { ActionTypes }  from "../store/actionTypes";
import { initialState } from "../store/initialState"

//型定義の敗北
export const UsersReducer = (state = initialState.users, action: any) => {
    switch (action.type) {
        case ActionTypes.fetchProductsInCart:
            return {
                ...state,
                cart: [...action.payload]
            }
        case ActionTypes.signIn:
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.signOut:
            return {
                ...action.payload
            }
        default:
            return state
    }
}