import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { initialStateType }  from '../reducks/store/initialState'
import { getOrdersHistory }  from '../reducks/users/selectors'
import { fetchOrderHistory } from '../reducks/users/operations'
import OrderHistoryItem      from '../components/products/OrderHistoryItem'

import List           from '@material-ui/core/List'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
    orderList: {
        margin: '0 auto',
        padding: 32,
    }
}))

const OrderHistory = () => {
    const classes = useStyles()

    const dispatch = useDispatch()
    const selector = useSelector((state: initialStateType) => state)
    const orders   = getOrdersHistory(selector)

    useEffect(() => {
        dispatch(fetchOrderHistory())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="c-section-wrapin">
            <List className={classes.orderList}>
                {orders.length > 0 && (
                    orders.map(order =>
                        <OrderHistoryItem
                            order={order}
                            key={order.id}
                        />
                    )
                )}
            </List>
        </section>
    )
}

export default OrderHistory