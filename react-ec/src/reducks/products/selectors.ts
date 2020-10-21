import { createSelector }  from "reselect"
import { ProductTypes }    from "./types"

export type SelectorState = {
    products: {
        list: Array<ProductTypes>
    }
}

const productsSelector = (state: SelectorState) => state.products

export const getProducts = createSelector(
    [productsSelector],
    state => state.list
)