import { ProductCartType, ProductTypes } from "../products/types";
import { OrderHistoryType } from "../users/types";

export type initialStateType = {
    products: {
        list: Array<ProductTypes>
    },
    users: {
        cart: Array<ProductCartType>
        orders: Array<OrderHistoryType>
        isSignedIn: boolean
        role: string
        uid: string
        username: string
    }
}

export const initialState: initialStateType = {
    products: {
        list: []
    },
    users: {
        cart: [],
        orders: [],
        isSignedIn: false,
        role: "",
        uid: "",
        username: ""
    }
};