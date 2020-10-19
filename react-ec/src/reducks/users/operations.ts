import { auth, db, FirebaseTimestamp } from "../../firebase/index"

type SignUpType = {
    username: string
    email: string
    password: string
    confirmPassword: string
}

/*
export const SignUp: React.FC<SignUpType> = ({ username, email, password, confirmPassword }) => {
    return async (dispatch: any) => {
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
*/