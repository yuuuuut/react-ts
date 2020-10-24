import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { initialStateType }  from '../reducks/store/initialState'
import { getProductsInCart } from '../reducks/users/selectors'
import { CartListItem }      from '../components/products'
import { PrimaryButton }     from '../components/UIkit'
import { ProductCartType }   from '../reducks/products/types'
import GreyButton from '../components/UIkit/GreyButton'
import { push }   from 'connected-react-router'

import List from '@material-ui/core/List'

const CartList = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state: initialStateType) => state)

    const productsInCart = getProductsInCart(selector)

    const goToOrder = useCallback(() => {
        dispatch(push('/order/confirm'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const backToHome = useCallback(() => {
        dispatch(push('/'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">
                カート
            </h2>
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
            <div className="p-grid__column">
                <PrimaryButton
                    label={"レジへ進む"}
                    onClick={goToOrder}
                />
                <GreyButton
                    label={"ショッピングを続ける"}
                    onClick={backToHome}
                />
            </div>
        </section>
    )
}

export default CartList