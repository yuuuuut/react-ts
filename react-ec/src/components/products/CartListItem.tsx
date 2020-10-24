import React from 'react'

import { useSelector }      from 'react-redux'
import { initialStateType } from '../../reducks/store/initialState'
import { getUserId } from '../../reducks/users/selectors'
import { db } from '../../firebase'

import Divider        from '@material-ui/core/Divider'
import ListItem       from '@material-ui/core/ListItem'
import ListItemText   from '@material-ui/core/ListItemText'
import ListItemAvatr  from '@material-ui/core/ListItemAvatar'
import DeleteIcon     from '@material-ui/icons/Delete'
import IconButton     from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/styles'
import { ProductCartType } from '../../reducks/products/types'

const useStyles = makeStyles({
    list: {
        height: 128,
    },
    image: {
        objectFit: 'cover',
        margin: 16,
        height: 96,
        width: 96
    },
    text: {
        width: '100%'
    }
})

type CartListItemProps = {
    product: ProductCartType
}

const CartListItem = (props: CartListItemProps) => {
    const classes  = useStyles()
    const selector = useSelector((state: initialStateType) => state)
    const uid = getUserId(selector)

    const image  = props.product.images[0].path
    const price  = props.product.price.toLocaleString()
    const name   = props.product.name
    const size   = props.product.size
    const cartId = props.product.cartId

    const removeProductFromCart = (id: string) => {
        return db.collection('users').doc(uid)
            .collection('cart').doc(id)
            .delete()
    }

    return (
        <>
            <ListItem className={classes.list}>
                <ListItemAvatr>
                    <img className={classes.image} src={image} alt="test" />
                </ListItemAvatr>
                <div className={classes.text}>
                    <ListItemText primary={name} secondary={"サイズ:" + size} />
                    <ListItemText primary={"¥" + price} />
                </div>
                <IconButton>
                    <DeleteIcon onClick={() => removeProductFromCart(cartId)} />
                </IconButton>
            </ListItem>
            <Divider />
        </>
    )
}

export default CartListItem