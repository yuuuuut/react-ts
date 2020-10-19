import React from 'react'

import {Switch, Route} from 'react-router'
import {SignUp} from './templates'

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/signup"} component={SignUp} />
        </Switch>
    )
}

export default Router
