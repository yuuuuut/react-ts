import { auth, db, FirebaseTimestamp } from "../../firebase/index"
import { ProductTypes, Images, SizeArrayType } from './types'
import { push } from "connected-react-router"

const productsRef = db.collection('products')

export const saveProduct = (id: string,
                            name: string,
                            description: string,
                            gender: string,
                            category: string,
                            price: string,
                            images: Array<Images>,
                            sizes: Array<SizeArrayType>
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
            sizes: sizes,
            updated_at: timestamp
        }

        if (id === "") {
            const ref = productsRef.doc()
            id  = ref.id
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

