import React, {useState, useCallback} from 'react'
import { useDispatch } from 'react-redux'

import { TextInput, PrimaryButton } from '../components/UIkit'
import {resetPassword} from '../reducks/users/operations'

const Reset: React.FC = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState<string>("")

    const inputEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value)
    }, [setEmail])

    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">
                パスワードリセット
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
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"パスワードリセット"}
                    onClick={() => dispatch(resetPassword(email))}
                />
            </div>
        </div>
    )
}

export default Reset