/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'

import { db, FirebaseTimestamp }    from '../firebase'
import { addProductToCart }         from '../reducks/users/operations'
import { ImageSwiper, SizeTable }   from '../components/products'
import { RouterState }              from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles }  from '@material-ui/core'
import HTMLReactParser from 'html-react-parser'

type RootState = {
    router: RouterState
}

type dataType = firebase.firestore.DocumentData | undefined | null

const useStyles = makeStyles((theme) => ({
    sliderBox: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 24px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 400,
            width: 400
        }
    },
    detail: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 'auto',
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'auto',
            width: 400
        }
    },
    price: {
        fontSize: 36
    }
}))

const returnCodeToBr = (text: string) => {
    if (text === "") {
        return text
    } else {
        return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
    }
}

const ProductDetail = () => {
    const classes  = useStyles()
    const selector = useSelector((state: RootState) => state)
    const dispatch = useDispatch()

    const path = selector.router.location.pathname
    const id   = path.split('/product/')[1]

    const [product, setProduct] = useState<dataType>(null)

    const addProduct = useCallback((selectedSize: string) => {
        const timestamp = FirebaseTimestamp.now()

        if (product) {
            dispatch(addProductToCart({
                added_at: timestamp,
                description: product.description,
                gender: product.gender,
                images: product.images,
                name: product.name,
                price: product.price,
                productId: product.id,
                quantity: 1,
                size: selectedSize,
                cartId: ""
            }))
        }
    }, [product])

    useEffect(() => {
        db.collection('products').doc(id).get()
            .then(doc => {
                const data = doc.data()
                setProduct(data)
            })
    }, [])

    return (
        <section className="c-section-wrapin">
            {product && (
                <div className="p-grid__row">
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={product.images} />
                    </div>
                    <div className={classes.detail}>
                        <h2 className="u-text__headline">
                            {product.name}
                        </h2>
                        <p className={classes.price}>
                            {product.price.toLocaleString()}
                        </p>
                        <SizeTable addProduct={addProduct} sizes={product.sizes} />
                        <p>
                            {returnCodeToBr(product.description)}
                        </p>
                    </div>
                </div>
            )}
        </section>
    )
}

export default ProductDetail