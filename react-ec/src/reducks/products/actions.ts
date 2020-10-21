import { ActionTypes }   from "../store/actionTypes"
import { ProductTypes }  from './types'

export const fetchProductsAction = (products: Array<ProductTypes>) => {
    return {
        type: ActionTypes.fetchProducts,
        payload: products
    }
}

export const deleteProductsAction = (products: Array<ProductTypes>) => {
    return {
        type: ActionTypes.deleteProduct,
        payload: products
    }
}