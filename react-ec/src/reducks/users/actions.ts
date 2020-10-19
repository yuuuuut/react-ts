import { ActionTypes } from '../store/actionTypes'
import { UserState } from './types'

export const signInAction = (userState: UserState['payload']): UserState => {
    return {
        type: ActionTypes.signIn,
        payload: {
            isSignedIn: true,
            role: userState.role,
            uid: userState.uid,
            username: userState.username
        }
    }
}