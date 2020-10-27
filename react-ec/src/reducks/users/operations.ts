import { fetchOrdersHistoryAction, fetchProductsInCartAction, signInAction, signOutAction } from "./actions"
import { auth, db, FirebaseTimestamp } from "../../firebase/index"
import { ProductCartType }  from "../products/types"
import { initialStateType } from "../store/initialState"
import { OrderHistoryType } from "./types"
import { push } from "connected-react-router"

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

export const addProductToCart = (addedProduct: ProductCartType) => {
    return async (dispatch: Function, getState: () => initialStateType) => {
        const uid = getState().users.uid
        const cartRef = db.collection('users').doc(uid)
                            .collection('cart').doc()

        addedProduct['cartId'] = cartRef.id
        await cartRef.set(addedProduct)
        dispatch(push('/'))
    }
}

export const fetchProductsInCart = (products: Array<ProductCartType>) => {
    return async (dispatch: Function) => {
        dispatch(fetchProductsInCartAction(products))
    }
}

export const fetchOrderHistory = () => {
    return async (dispatch: Function, getState: () => initialStateType) => {
        const uid  = getState().users.uid
        const list: Array<OrderHistoryType> = []

        db.collection('users').doc(uid)
            .collection('orders')
            .orderBy('updated_at', 'desc')
            .get()
            .then((snapshots) => {
                snapshots.forEach(snapshot => {
                    const data: any = snapshot.data()
                    list.push(data)
                })

                dispatch(fetchOrdersHistoryAction(list))
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