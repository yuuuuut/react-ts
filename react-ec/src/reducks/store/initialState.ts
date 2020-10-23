import { ProductCartType, ProductTypes } from "../products/types";

export type initialStateType = {
    products: {
        list: Array<ProductTypes>
    },
    users: {
        cart: Array<ProductCartType>
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
        isSignedIn: false,
        role: "",
        uid: "",
        username: ""
    }
};