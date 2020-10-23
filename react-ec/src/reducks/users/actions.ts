import { ProductCartType } from '../products/types'
import { ActionTypes } from '../store/actionTypes'
import { UserState }   from './types'

export const fetchProductsInCartAction = (products: Array<ProductCartType>) => {
    return {
        type: ActionTypes.fetchProductsInCart,
        payload: products
    }
}

export const signInAction = (userState: UserState['payload']): UserState => {
    return {
        type: ActionTypes.signIn,
        payload: {
            isSignedIn: true,
            role: userState.role,
            uid: userState.uid,
            username: userState.username
        }
    }
}

export const signOutAction = () => {
    return {
        type: ActionTypes.signOut,
        payload: {
            isSignedIn: true,
            role: "",
            uid: "",
            username: ""
        }
    }
}