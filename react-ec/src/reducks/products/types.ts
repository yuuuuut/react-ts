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
    created_at?: any
    updated_at: any
}