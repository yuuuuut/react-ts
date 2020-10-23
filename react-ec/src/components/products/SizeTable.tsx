import React from 'react'

import {SizeArrayType} from '../../reducks/products/types'

import TableContainer     from '@material-ui/core/TableContainer'
import Table              from '@material-ui/core/Table'
import TableBody          from '@material-ui/core/TableBody'
import TableCell          from '@material-ui/core/TableCell'
import TableRow           from '@material-ui/core/TableRow'
import IconButton         from '@material-ui/core/IconButton'
import ShoppingCartIcon   from "@material-ui/icons/ShoppingCart"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"

type SizeTableProps = {
    sizes: Array<SizeArrayType>
    addProduct: (size: string) => void
}

const SizeTable = (props: SizeTableProps) => {
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {props.sizes.length > 0 && (
                        props.sizes.map((size: SizeArrayType) => (
                            <TableRow key={size.size}>
                                <TableCell component="th" scope="row">
                                    {size.size}
                                </TableCell>
                                <TableCell>
                                    残り{size.quantity}
                                </TableCell>
                                <TableCell>
                                    {size.quantity > 0 ? (
                                        <IconButton onClick={() => props.addProduct(size.size)}>
                                            <ShoppingCartIcon />
                                        </IconButton>
                                    ) : (
                                        <div>売り切れ</div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SizeTable