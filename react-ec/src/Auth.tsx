import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { initialStateType } from './reducks/store/initialState'
import { listenAuthState }  from './reducks/users/operations'
import { getIsSignedIn }    from './reducks/users/selectors'

const Auth: React.FC = ({ children }): any => {
    const dispatch = useDispatch()
    const selector = useSelector((state: initialStateType) => state)
    const isSignedIn = getIsSignedIn(selector)

    useEffect(() => {
        if (!isSignedIn) {
            dispatch(listenAuthState())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!isSignedIn) {
        return <></>
    } else {
        return children
    }

}

export default Auth