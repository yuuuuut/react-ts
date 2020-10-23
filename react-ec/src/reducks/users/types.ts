export type UserState = {
    type?: string,
    payload: {
        isSignedIn: boolean
        role: string
        uid: string
        username: string
    }
}