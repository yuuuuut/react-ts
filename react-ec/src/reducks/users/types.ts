import { ProductTypes } from "../products/types"

export type UserState = {
    type?: string,
    payload: {
        isSignedIn: boolean
        role: string
        uid: string
        username: string
    }
}

export type OrderHistoryType = {
    id: string
    amount: number
    products: Array<ProductTypes>
    sipping_date: firebase.firestore.Timestamp
    created_at: firebase.firestore.Timestamp
    updated_at: firebase.firestore.Timestamp
}