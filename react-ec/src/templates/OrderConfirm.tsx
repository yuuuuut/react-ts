import React, { useCallback, useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { initialStateType }  from '../reducks/store/initialState'
import { getProductsInCart } from '../reducks/users/selectors'
import { ProductCartType }   from '../reducks/products/types'
import { CartListItem }      from '../components/products'
import { orderProduct }      from '../reducks/products/operations'

import List           from '@material-ui/core/List'
import Divider        from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/styles'
import { PrimaryButton, TextDetail } from '../components/UIkit'

const useStyles = makeStyles((theme) => ({
    detailBox: {
        margin: '0 auto',
    },
    orderBox: {
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: 4,
        boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
        height: 256,
        margin: '24px auto 16px auto',
        padding: 16,
        width: 288
    }
}))

const OrderConfirm = () => {
    const classes  = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state: initialStateType) => state)
    const productsInCart = getProductsInCart(selector)

    const subTotal = useMemo(() => {
        return productsInCart.reduce((sum, product) => sum += Number(product.price), 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsInCart])

    const shippingFee = (subTotal >= 10000) ? 0 : 210
    const tax   = subTotal * 0.1
    const total = subTotal + shippingFee + tax

    const order = useCallback(() => {
        dispatch(orderProduct(productsInCart, total))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsInCart, total])

    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">注文の確認</h2>
            <div className="p-grid__row">
                <div className={classes.detailBox}>
                    <List>
                        {productsInCart.length > 0 && (
                            productsInCart.map((product: ProductCartType) =>
                                <CartListItem
                                    key={product.cartId}
                                    product={product}
                                />
                            )
                        )}
                    </List>
                </div>
                <div className={classes.orderBox}>
                    <TextDetail label={"商品合計"} value={"¥" + subTotal.toLocaleString()} />
                    <TextDetail label={"送料"} value={"¥" + shippingFee} />
                    <TextDetail label={"消費税"} value={"¥" + tax} />
                    <Divider />
                    <TextDetail label={"合計 (税込)"} value={"¥" + total} />
                    <PrimaryButton label={"注文する"} onClick={order} />
                </div>
            </div>
        </section>
    )
}

export default OrderConfirm