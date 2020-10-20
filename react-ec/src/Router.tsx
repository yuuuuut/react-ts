import React from 'react'
import {Switch, Route} from 'react-router'

import {SignUp, Home, SignIn, Reset} from './templates'
import Auth from './Auth'

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/reset"}  component={Reset} />

            <Auth>
                <Route exact path={"(/)?"} component={Home} />
            </Auth>
        </Switch>
    )
}

export default Router
