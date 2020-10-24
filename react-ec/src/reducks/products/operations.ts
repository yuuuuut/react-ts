import { deleteProductsAction, fetchProductsAction } from './actions'
import { ProductTypes, Images, SizeArrayType, ProductCartType } from './types'
import { db, FirebaseTimestamp } from "../../firebase/index"
import { push } from "connected-react-router"

type SnapShptType = firebase.firestore.DocumentData

type ProductType = {
    id: string
    images: Array<Images>
    name: string
    price: string
    size: string
}

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

export const orderProduct = (productsInCart: Array<ProductCartType>, amount: number) => {
    return async (dispatch: Function, getState: Function) => {

        const uid = getState().users.uid
        const userRef   = db.collection('users').doc(uid)
        const timestamp = FirebaseTimestamp.now()

        let products: Array<ProductType >  = [],
            soldOutProducts: Array<string> = []

        const batch = db.batch()

        for (const product of productsInCart) {
            const snapshot: SnapShptType      = await productsRef.doc(product.productId).get()
            const sizes: Array<SizeArrayType> = snapshot.data().sizes

            const updatedSizes = sizes.map(size => {
                if (size.size === product.size) {
                    if (size.quantity === 0) {
                        soldOutProducts.push(product.name)
                        return size
                    }
                    return {
                        size: size.size,
                        quantity: size.quantity - 1
                    }
                } else {
                    return size
                }
            })

            products.push({
                id: product.productId,
                images: product.images,
                name: product.name,
                price: product.price,
                size: product.size,
            })

            console.log(products)

            batch.update(
                productsRef.doc(product.productId),
                {sizes: updatedSizes}
            )

            batch.delete(
                userRef.collection('cart').doc(product.cartId)
            )
        }

        if (soldOutProducts.length > 0) {
            const errorMessage = (soldOutProducts.length > 1) ? soldOutProducts.join('と') : soldOutProducts[0]
            alert('ごめんなさい。' + errorMessage + 'が在庫切れです')
            return false
        } else {
            batch.commit()
                .then(() => {
                    const orderRef = userRef.collection('orders').doc()
                    const date = timestamp.toDate()
                    const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)))

                    const history = {
                        amount: amount,
                        created_at: timestamp,
                        id: orderRef.id,
                        products: products,
                        sipping_date: shippingDate,
                        updated_at: timestamp
                    }

                    orderRef.set(history)
                    dispatch(push('/order/complate'))
                }).catch(() => {
                    alert('Error!!')
                    return false
                })
        }
    }
}

