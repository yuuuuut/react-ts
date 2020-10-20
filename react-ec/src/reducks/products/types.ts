export interface Images {
    id: string
    path: string
}

export type ProductTypes = {
    id: string
    category: string
    description: string
    gender: string
    images: Array<Images>
    name: string
    price: number
    created_at?: any
    updated_at: any
}