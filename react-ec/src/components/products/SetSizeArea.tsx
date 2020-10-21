import React, { useCallback, useEffect, useState } from 'react'

import { SizeArrayType } from '../../reducks/products/types'
import { TextInput }     from '../UIkit'

import TableContainer  from '@material-ui/core/TableContainer'
import Paper           from '@material-ui/core/Paper'
import Table           from '@material-ui/core/Table'
import TableBody       from '@material-ui/core/TableBody'
import TableCell       from '@material-ui/core/TableCell'
import TableHead       from '@material-ui/core/TableHead'
import TableRow        from '@material-ui/core/TableRow'
import IconButton      from '@material-ui/core/IconButton'
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import DeleteIcon      from "@material-ui/icons/Delete"
import EditIcon        from "@material-ui/icons/Edit"
import { makeStyles }  from '@material-ui/core'

type SetSizeAreaProps = {
    sizes: Array<SizeArrayType>
    setSizes: Function
}

const useStyles = makeStyles({
    checkIcon: {
        float: "right"
    }
})

const SetSizeArea = (props: SetSizeAreaProps) => {
    const classes = useStyles()

    const [index, setIndex] = useState<number>(0)
    const [size, setSize] = useState<string>("")
    const [quantity, setQuantity] = useState<number>(0)

    const inputSize = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setSize(event.target.value)
    }, [setSize])

    const inputQuantity = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setQuantity(event.target.valueAsNumber)
    }, [setQuantity])

    const addSize = (index: number, size: string, quantity: number) => {
        if (size === "") {
            return false
        } else {
            if (index === props.sizes.length) {
                props.setSizes((prevState: Array<SizeArrayType>) =>
                    [...prevState, {size: size, quantity: quantity}]
                )
                setIndex(index + 1)
                setSize("")
                setQuantity(0)
            } else {
                const newSizes = props.sizes
                newSizes[index] = {size: size, quantity: quantity}
                props.setSizes(newSizes)
                setIndex(newSizes.length)
                setSize("")
                setQuantity(0)
            }
        }
    }

    const editSize = (index: number, size: string, quantity: number): void => {
        setIndex(index)
        setSize(size)
        setQuantity(quantity)
    }

    const deleteSize = (deleteIndex: number) => {
        const newSizes = props.sizes.filter((item, index) =>
            index !== deleteIndex
        )
        props.setSizes(newSizes)
    }

    useEffect(() => {
        setIndex(props.sizes.length)
    },[props.sizes.length])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>サイズ</TableCell>
                            <TableCell>数量</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.sizes.length > 0 && (
                            props.sizes.map((item: SizeArrayType, index) => (
                                <TableRow key={item.size}>
                                    <TableCell>{item.size}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <EditIcon onClick={() => editSize(index, item.size, item.quantity)} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <DeleteIcon onClick={() => deleteSize(index)} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <div>
                    <TextInput
                        fullWidth={false}
                        label={"サイズ"}
                        multiline={false}
                        required={true}
                        onChange={inputSize}
                        rows={1}
                        value={size}
                        type={"text"}
                    />
                    <TextInput
                        fullWidth={false}
                        label={"数量"}
                        multiline={false}
                        required={true}
                        onChange={inputQuantity}
                        rows={1}
                        value={quantity}
                        type={"number"}
                    />
                </div>
                <IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quantity)}>
                    <CheckCircleIcon />
                </IconButton>
            </TableContainer>
        </div>
    )
}

export default SetSizeArea