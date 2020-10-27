import React, { useCallback } from 'react'

import { useDispatch }  from 'react-redux'
import { push }         from 'connected-react-router'
import { ProductTypes } from '../../reducks/products/types'

import List              from '@material-ui/core/List'
import ListItem          from '@material-ui/core/ListItem'
import ListItemAvatar    from '@material-ui/core/ListItemAvatar'
import ListItemText      from '@material-ui/core/ListItemText'
import { PrimaryButton } from '../UIkit'
import { makeStyles }    from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    image: {
        objectFit: 'cover',
        margin: '8px 16px 8px 0',
        height: 96,
        width: 96
    }
}))

type OrderProductsProps = {
    products: Array<ProductTypes>
}

const OrderProducts = (props: OrderProductsProps) => {
    const classes  = useStyles();
    const dispatch = useDispatch()
    const products = props.products

    const goToProductDetail = useCallback((id: string) => {
        dispatch(push('/product/' + id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <List>
            {products.map(product => (
                    <>
                        <ListItem key={product.id}>
                            <ListItemAvatar>
                                <img className={classes.image} src={product.images[0].path} alt="商品のTOP画像" />
                            </ListItemAvatar>
                            <div>
                                <ListItemText primary={product.name} secondary={"サイズ：" + product.size} />
                                <ListItemText primary={"¥"+product.price.toLocaleString()} />
                            </div>
                            <PrimaryButton label={"商品詳細を見る"} onClick={() => goToProductDetail(product.id)} />
                        </ListItem>
                    </>
            ))}
        </List>
    )
}

export default OrderProducts