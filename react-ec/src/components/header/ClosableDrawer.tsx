import React, { useCallback, useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { push }        from 'connected-react-router'
import { signOut }     from '../../reducks/users/operations'
import { db }          from '../../firebase'

import Divider        from '@material-ui/core/Divider'
import Drawer         from '@material-ui/core/Drawer'
import List           from '@material-ui/core/List'
import ListItem       from '@material-ui/core/ListItem'
import ListItemIcon   from '@material-ui/core/ListItemIcon'
import ListItemText   from '@material-ui/core/ListItemText'
import IconButton     from '@material-ui/core/IconButton'
import SearchIcon     from '@material-ui/icons/Search'
import AddCircleIcon  from '@material-ui/icons/AddCircle'
import HistoryIcon    from '@material-ui/icons/History'
import PersonIcon     from '@material-ui/icons/Person'
import ExitToAppIcon  from '@material-ui/icons/ExitToApp'
import { makeStyles } from '@material-ui/core'
import { TextInput }  from '../UIkit'

type ClosableDrawerProps = {
    open: boolean
    onClose: (event: any) => void
    container?: Element | React.Component<any, {}, any> | (() => Element | React.Component<any, {}, any> | null) | null | undefined
}

type FilterListType = {
    func: (event: any, path: string) => void
    label: string
    id: string
    value: string
}

type CategoryDataType = {
    id: string
    name: string
}

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            flexShrink: 0,
            width: 256,
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: 256
    },
    searchField: {
        alignItems: 'center',
        display: 'flex',
        marginLeft: 32
    }
}))

const ClosableDrawer = (props: ClosableDrawerProps) => {
    const classes  = useStyles()
    const dispatch = useDispatch()
    const {container} = props

    const [keyword, setKeyword] = useState<string>('')

    const inputKeyword = useCallback((event) => {
        setKeyword(event.target.value)
    }, [setKeyword])

    const selectMenu = (event: any, path: string) => {
        dispatch(push(path))
        props.onClose(event)
    }

    const [filters, setFilters] = useState<Array<FilterListType>>([
        {func: selectMenu, label: "すべて", id: "all", value: "/"},
        {func: selectMenu, label: "メンズ", id: "male", value: "/?gender=male"},
        {func: selectMenu, label: "レディース", id: "female", value: "/?gender=female"},
    ])

    const menus = [
        {func: selectMenu, label: "商品登録",    icon: <AddCircleIcon />, id: "register", value: "/product/edit"},
        {func: selectMenu, label: "注文履歴",    icon: <HistoryIcon />,   id: "history", value: "/order/history"},
        {func: selectMenu, label: "プロフィール", icon: <PersonIcon />,    id: "profile", value: "/user/mypage"},
    ]

    useEffect(() => {
        db.collection('categories')
            .orderBy('order', 'asc')
            .get()
            .then(snapshots => {
                const list: Array<FilterListType> = []

                snapshots.forEach(snapshot => {
                    const category = snapshot.data() as CategoryDataType

                    list.push({
                        func: selectMenu,
                        label: category.name,
                        id: category.id,
                        value: `/?category=${category.id}`
                    })
                    setFilters(prevState => [...prevState, ...list])
                })
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <nav className={classes.drawer}>
            <Drawer
                container={container}
                variant="temporary"
                anchor="right"
                open={props.open}
                onClose={(e) => props.onClose(e)}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
            >
                <div>
                    <div className={classes.searchField}>
                        <TextInput
                            fullWidth={false}
                            label={"キーワードを入力"}
                            multiline={false}
                            onChange={inputKeyword}
                            required={false}
                            rows={1}
                            value={keyword}
                            type={"text"}
                        />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {menus.map(menu => (
                            <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                        ))}
                        <ListItem button key="logout" onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary={"ログアウト"} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {filters.map(filter => (
                            <ListItem
                                button
                                key={filter.id}
                                onClick={(e) => filter.func(e, filter.value)}
                            >
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </nav>
    )
}

export default ClosableDrawer