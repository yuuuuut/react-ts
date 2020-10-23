import React, { useCallback, useState } from 'react'

import { useDispatch, useSelector }   from 'react-redux';
import { getIsSignedIn } from '../../reducks/users/selectors';
import { AuthUsersType } from '../../Auth';
import { push }          from 'connected-react-router';
import HeaderMenus    from './HeaderMenus';
import ClosableDrawer from './ClosableDrawer';

import { makeStyles } from '@material-ui/core/styles';
import AppBar  from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    menuBar: {
        backgroundColor: "#fff",
        color: "#444"
    },
    toolBar: {
        margin: '0 auto',
        maxWidth: 1024,
        width: '100%'
    },
    iconButtons: {
        margin: '0 0 0 auto'
    }
})

const Header = () => {
    const classes = useStyles()

    const dispatch   = useDispatch()
    const selector   = useSelector((state: AuthUsersType) => state)
    const isSignedIn = getIsSignedIn(selector)

    const [open, setOpen] = useState<boolean>(false)

    const handleDrawerToggle = useCallback((event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        
        setOpen(!open)
    }, [setOpen, open])

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolBar}>
                    <h1 onClick={() => dispatch(push('/'))}>
                        ロゴ
                    </h1>
                    {isSignedIn && (
                        <div className={classes.iconButtons}>
                            <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <ClosableDrawer open={open} onClose={handleDrawerToggle} />
        </div>
    )
}

export default Header