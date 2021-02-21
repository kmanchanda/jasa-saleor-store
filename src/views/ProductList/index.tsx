import ProductCardTemplate from '@temp/components/Product-Card/productCard.component';
import React from 'react';

import './scss/index.scss'

type propTypes = {
    products: any
}


const ProductListModule = ({ products }: propTypes) => {

    let dummyData = [...products, ...products, ...products] // todo@umang

    const data = dummyData.filter((item => item?.thumbnail?.url))

    return (<div className='product-list-module w-full'>

        {
            data.length ?
                data.map((item, index) => {
                    const { thumbnail, name, } = item || {}
                    return (
                        <ProductCardTemplate imageUrl={thumbnail.url} heading={name} />
                    )
                })

                : null
        }


    </div>)

}
export default ProductListModule;