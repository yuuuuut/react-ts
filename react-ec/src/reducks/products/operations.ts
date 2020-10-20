import { auth, db, FirebaseTimestamp } from "../../firebase/index"
import { push } from "connected-react-router"
import { ProductTypes, Images } from './types'

const productsRef = db.collection('products')

export const saveProduct = (id: string,
                            name: string,
                            description: string,
                            gender: string,
                            category: string,
                            price: string,
                            images: Array<Images>
                            ) => {
    return async (dispatch: Function) => {
        const timestamp = FirebaseTimestamp.now()

        const data: ProductTypes = {
            id: "",
            category: category,
            description: description,
            gender: gender,
            images: images,
            name: name,
            price: parseInt(price, 10),
            updated_at: timestamp
        }

        if (id === "") {
            const ref = productsRef.doc()
            const id  = ref.id
            data.id = id
            data.created_at = timestamp
        }

        return productsRef.doc(id).set(data, {merge: true})
            .then(() => {
                dispatch(push('/'))
            }).catch((e) => {
                console.log(e)
            })
    }
}

