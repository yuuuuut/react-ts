import React, {useCallback, useState} from 'react'
import { useDispatch } from 'react-redux'
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit'
import { saveProduct } from '../reducks/products/operations'

const ProductEdit = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [gender, setGender] = useState<string>("")
    const [price, setPrice] = useState<string>("")

    const inputName = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value)
    }, [setName])

    const inputDescription = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setDescription(event.target.value)
    }, [setDescription])

    const inputPrice = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setPrice(event.target.value)
    }, [setPrice])

    const categories = [
        {id: "tops" ,name: "トップス"},
        {id: "shirts" ,name: "シャツ"},
    ]

    const genders = [
        {id: "all" ,name: "すべて"},
        {id: "male" ,name: "男性"},
        {id: "female" ,name: "女性"},
    ]

    return (
        <section>
            <h2 className="u-text__headline u-text-center">
                商品の登録・編集
            </h2>
            <div className="c-section-container">
                <TextInput
                    fullWidth={true}
                    label={"商品名"}
                    multiline={false}
                    required={true}
                    onChange={inputName}
                    rows={1}
                    value={name}
                    type={"text"}
                />
                <TextInput
                    fullWidth={true}
                    label={"商品説明"}
                    multiline={true}
                    required={true}
                    onChange={inputDescription}
                    rows={5}
                    value={description}
                    type={"text"}
                />
                <SelectBox
                    label={"カテゴリー"}
                    required={true}
                    options={categories}
                    select={setCategory}
                    value={category}
                />
                <SelectBox
                    label={"性別"}
                    required={true}
                    options={genders}
                    select={setGender}
                    value={gender}
                />
                <TextInput
                    fullWidth={true}
                    label={"価格"}
                    multiline={false}
                    required={true}
                    onChange={inputPrice}
                    rows={1}
                    value={price}
                    type={"number"}
                />
                <div className="module-spacer--medium" />
                <div className="center">
                    <PrimaryButton
                        label={"保存"}
                        onClick={() => dispatch(saveProduct(name, description, category, gender, price))}
                    />
                </div>
            </div>
        </section>
    )
}

export default ProductEdit