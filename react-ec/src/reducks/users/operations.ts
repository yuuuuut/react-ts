import { auth, db, FirebaseTimestamp } from "../../firebase/index"
import { push } from "connected-react-router"
import { signInAction, signOutAction } from "./actions"

export const listenAuthState = () => {
    return async (dispatch: Function) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid

                db.collection('users').doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()

                        if (data) {
                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username
                            }))
                        }
                    })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
}

export const signIn = (email: string, password: string) => {
    return async (dispatch: Function) => {
        // Validation
        if (email === "" || password === "") {
            alert("必須項目が未入力です")
            return false
        }

        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user

                if (user) {
                    const uid = user.uid

                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data()

                            if (data) {
                                dispatch(signInAction({
                                    isSignedIn: true,
                                    role: data.role,
                                    uid: uid,
                                    username: data.username
                                }))

                                dispatch(push('/'))
                            }
                        })
                }
            })
    }
}

export const signUp = (username: string, email:string, password: string, confirmPassword: string) => {
    return async (dispatch: Function) => {
        // Validation
        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            alert("必須項目が未入力です")
            return false
        }

        if (password !== confirmPassword) {
            alert("パスワードが一致しません")
            return false
        }

        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user

                if (user) {
                    const uid = user.uid
                    const timestamp = FirebaseTimestamp.now()

                    const userInitialData = {
                        created_at: timestamp,
                        email: email,
                        role: "customer",
                        uid: uid,
                        updated_at: timestamp,
                        username: username,
                    }

                    db.collection('users').doc(uid).set(userInitialData)
                        .then(async () => {
                            dispatch(push('/'))
                        })
                }
            })
    }
}

export const resetPassword = (email: string) => {
    return async (dispatch: Function) => {
        if (email === "") {
            alert("必須項目が未入力です")
            return false
        } else {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('入力されたアドレスに送りました')
                    dispatch(push('/signin'))
                }).catch(() => {
                    alert('エラー')
                })
        }
    }
}

export const signOut = () => {
    return async (dispatch: Function) => {
        auth.signOut()
            .then(() => {
                dispatch(signOutAction())
                dispatch(push('/signin'))
            })
    }
}