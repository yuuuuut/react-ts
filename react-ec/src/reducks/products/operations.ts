import { deleteProductsAction, fetchProductsAction } from './actions'
import { ProductTypes, Images, SizeArrayType } from './types'
import { db, FirebaseTimestamp } from "../../firebase/index"
import { push } from "connected-react-router"


const productsRef = db.collection('products')

export const fetchProducts = () => {
    return async (dispatch: Function) => {
        productsRef.orderBy('updated_at', 'desc').get()
            .then(snapshots => {
                const productList: Array<ProductTypes> = []

                snapshots.forEach(snapshot => {
                    const product: any = snapshot.data()
                    productList.push(product)
                })
                dispatch(fetchProductsAction(productList))
            })
    }
}

export const deleteProduct = (id: string) => {
    return async (dispatch: Function, getState: Function) => {
        productsRef.doc(id).delete()
            .then(() => {
                const prevProducts: Array<ProductTypes> = getState().products.list
                const nextProducts = prevProducts.filter(product => product.id !== id)
                dispatch(deleteProductsAction(nextProducts))
            })
    }
}

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
            id: id,
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
            id = ref.id
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

