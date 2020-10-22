import React, {useState, useCallback} from 'react'

import { useDispatch } from 'react-redux'
import {signUp}        from '../reducks/users/operations'
import { TextInput, PrimaryButton } from '../components/UIkit'

const SignUp = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const inputUsername = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value)
    }, [setUsername])

    const inputEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value)
    }, [setEmail])

    const inputPassword = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value)
    }, [setPassword])

    const inputConfirmPassword = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setConfirmPassword(event.target.value)
    }, [setConfirmPassword])

    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">
                アカウント登録
            </h2>
            <div className="module-spacer--medium" />
            <TextInput
                fullWidth={true}
                label={"ユーザー名"}
                multiline={false}
                required={true}
                rows={1}
                value={username}
                type={"text"}
                onChange={inputUsername}
            />
            <TextInput
                fullWidth={true}
                label={"メールアドレス"}
                multiline={false}
                required={true}
                rows={1}
                value={email}
                type={"email"}
                onChange={inputEmail}
            />
            <TextInput
                fullWidth={true}
                label={"パスワード"}
                multiline={false}
                required={true}
                rows={1}
                value={password}
                type={"password"}
                onChange={inputPassword}
            />
            <TextInput
                fullWidth={true}
                label={"パスワード(確認)"}
                multiline={false}
                required={true}
                rows={1}
                value={confirmPassword}
                type={"password"}
                onChange={inputConfirmPassword}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"アカウントを登録する"}
                    onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
                />
            </div>
        </div>
    )
}

export default SignUp