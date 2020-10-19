import React, {useState, useCallback} from 'react'
import { useDispatch } from 'react-redux'

import { TextInput, PrimaryButton } from '../components/UIkit'
import {signIn} from '../reducks/users/operations'

const SignIn: React.FC = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const inputEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value)
    }, [setEmail])

    const inputPassword = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value)
    }, [setPassword])

    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">
                ログイン
            </h2>
            <div className="module-spacer--medium" />
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
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"ログイン"}
                    onClick={() => dispatch(signIn(email, password))}
                />
            </div>
        </div>
    )
}

export default SignIn