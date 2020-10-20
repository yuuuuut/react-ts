import { auth, db, FirebaseTimestamp } from "../../firebase/index"
import { push } from "connected-react-router"

const productsRef = db.collection('products')

export const saveProduct = (name: string,
                            description: string,
                            gender: string,
                            category: string,
                            price: string
                            ) => {
    return async (dispatch: Function) => {
        const timestamp = FirebaseTimestamp.now()

        const data = {
            id: "",
            category: category,
            description: description,
            gender: gender,
            name: name,
            price: parseInt(price, 10),
            created_at: timestamp,
            updated_at: timestamp
        }

        const ref = productsRef.doc()
        const id  = ref.id
        data.id = id
        data.created_at = timestamp

        return productsRef.doc(id).set(data)
            .then(() => {
                dispatch(push('/'))
            }).catch((e) => {
                console.log(e)
            })
    }
}

