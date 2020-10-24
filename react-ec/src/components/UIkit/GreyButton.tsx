import React from 'react'

import Button       from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/styles'

type PrimaryButtonProps = {
    label: string
    onClick: Function
}

const useStyles = makeStyles((theme) => ({
    "button": {
        backgroundColor: 'grey',
        color: "#000",
        fontSize: 16,
        height: 48,
        marginBottom: 16,
        width: 256
    }
}))

const GreyButton = (props: PrimaryButtonProps) => {
    const classes = useStyles()

    return (
        <Button
            className={classes.button}
            variant="contained"
            onClick={() => props.onClick()}
        >
            {props.label}
        </Button>
    )
}

export default GreyButton