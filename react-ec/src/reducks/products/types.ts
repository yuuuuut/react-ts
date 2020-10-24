export interface Images {
    id: string
    path: string
}

export interface SizeArrayType {
    size: string
    quantity: number
}

export type ProductTypes = {
    id: string
    category: string
    description: string
    gender: string
    images: Array<Images>
    sizes: Array<SizeArrayType>
    name: string
    price: number
    created_at?: firebase.firestore.Timestamp
    updated_at: firebase.firestore.Timestamp
}

export type ProductCartType = {
    added_at?: firebase.firestore.Timestamp,
    description: string
    gender: string
    images: Array<Images>
    name: string
    price: string
    productId: string
    quantity: number
    size: string
    cartId: string
}