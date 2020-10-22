import React, { ReactElement, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { listenAuthState } from './reducks/users/operations'
import { getIsSignedIn }   from './reducks/users/selectors'

export type AuthUsersType = {
    users: {
        uid: string
        isSignedIn: boolean
    }
}

const Auth: React.FC = ({ children }): any => {
    const dispatch = useDispatch()
    const selector = useSelector((state: AuthUsersType) => state)
    const isSignedIn = getIsSignedIn(selector)

    useEffect(() => {
        if (!isSignedIn) {
            dispatch(listenAuthState())
        }
    }, [])

    if (!isSignedIn) {
        return <></>
    } else {
        return children
    }

}

export default Auth