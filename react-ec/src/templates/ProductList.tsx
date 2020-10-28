import React, { useEffect } from 'react'

import { useDispatch, useSelector }   from 'react-redux'
import { getProducts}       from '../reducks/products/selectors'
import { ProductCard }      from '../components/products'
import { fetchProducts }    from '../reducks/products/operations'
import { initialStateType } from '../reducks/store/initialState'
import { RouterState }      from 'connected-react-router'

const ProductList = () => {
    const dispatch     = useDispatch()
    const selector     = useSelector((state: initialStateType) => state)
    const rootSelector = useSelector((state: {router: RouterState } ) => state)
    const products     = getProducts(selector)

    const query = rootSelector.router.location.search
    const gender   = /^\?gender=/.test(query) ? query.split('?gender=')[1] : ""
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : ""

    useEffect(() => {
        dispatch(fetchProducts(gender, category))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    return (
        <section className="c-section-wrapin">
            <div className="p-grid__row">
                {products.length > 0 && (
                    products.map(product => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            images={product.images}
                            price={product.price}
                        />
                    ))
                )}
            </div>
        </section>
    )
}

export default ProductList