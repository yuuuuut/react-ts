import React from 'react'

import {SignUp, SignIn, Reset, ProductEdit, ProductList, ProductDetail, CartList, OrderConfirm} from './templates'
import {Switch, Route} from 'react-router'
import Auth from './Auth'

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/reset"}  component={Reset} />

            <Auth>
                <Route exact path={"(/)?"}           component={ProductList} />
                <Route exact path={"/product/:id"}   component={ProductDetail} />
                <Route exact path={"/cart"}          component={CartList} />
                <Route exact path={"/order/confirm"} component={OrderConfirm} />
                <Route path={"/product/edit(/:id)?"} component={ProductEdit} />
            </Auth>
        </Switch>
    )
}

export default Router
