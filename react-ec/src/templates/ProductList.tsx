import React, { useEffect } from 'react'

import { getProducts, SelectorState } from '../reducks/products/selectors'
import { useDispatch, useSelector }   from 'react-redux'
import { ProductCard }   from '../components/products'
import { fetchProducts } from '../reducks/products/operations'

const ProductList = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state: SelectorState) => state)

    const products = getProducts(selector)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

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