import React from 'react'

import { OrderHistoryType } from '../../reducks/users/types'

import Divider        from '@material-ui/core/Divider'
import { TextDetail } from '../UIkit'
import OrderProducts  from './OrderProducts'

type OrderHistoryItemProps = {
    order: OrderHistoryType
}

const datetimeToString = (date: Date) => {
    return date.getFullYear() + '-'
        + ('00' + date.getMonth()+1).slice(-2) + '-'
        + ('00' + date.getDate()).slice(-2) + ' '
        + ('00' + date.getHours()).slice(-2) + '-'
        + ('00' + date.getMinutes()).slice(-2) + ':'
        + ('00' + date.getSeconds()).slice(-2)
}

const dateToString = (date: Date) => {
    return date.getFullYear() + '-'
        + ('00' + date.getMonth()+1).slice(-2) + '-'
        + ('00' + date.getDate()).slice(-2) + ' '
}

const OrderHistoryItem = (props: OrderHistoryItemProps) => {
    const orderedDatetime = datetimeToString(props.order.updated_at.toDate())
    const shippingDate    = dateToString(props.order.sipping_date.toDate())

    return (
        <div>
            <TextDetail
                label={"注文ID"}
                value={props.order.id}
            />
            <TextDetail
                label={"注文日時"}
                value={orderedDatetime}
            />
            <TextDetail
                label={"発送予定日"}
                value={shippingDate}
            />
            <TextDetail
                label={"注文金額"}
                value={String(props.order.amount)}
            />
            {props.order.products.length > 0 && (
                <OrderProducts products={props.order.products} />
            )}
            <Divider />
        </div>
    )
}

export default OrderHistoryItem