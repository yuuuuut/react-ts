import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../reducks/users/operations'
import { getUserId } from '../reducks/users/selectors'

const Home = () => {
    const dispatch = useDispatch()
    const selector: any = useSelector((state) => state)
    const uid = getUserId(selector)

    return (
        <>
            <h2>Home</h2>
            <h4>{uid}</h4>
            <button onClick={() => dispatch(signOut())}>
                ログアウト
            </button>
        </>
    )
}

export default Home