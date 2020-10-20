import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from "redux"
import {connectRouter, routerMiddleware} from "connected-react-router"
import thunk from 'redux-thunk'
import * as H from 'history'

import {UsersReducer} from "../users/reducers"
import {ProductsReducer} from "../products/reducers"

export default function createStore(history: H.History) {
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            users: UsersReducer,
            products: ProductsReducer
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}