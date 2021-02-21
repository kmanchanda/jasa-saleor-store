import React from 'react';

import './scss/index.scss';

type propTypes = {
    imageUrl?: string,
    heading?: string,
    subheading?: string,
    caption?: string
}

const ProductCardTemplate = ({ imageUrl = '', heading = '', subheading = '', caption = '' }: propTypes) => {
    return (
        <div className='product-card-temp'>

            <div className='image-container'>
                <img src={imageUrl} style={{ width: '100%' }} />
            </div>
            <span className='heading-styles'>
                {heading}
            </span>
            <span className='sub-heading-styles'>

            </span>

            {
                caption ?
                    <span className='caption-styles' >

                    </span>
                    : null
            }
        </div>
    )

}

export default ProductCardTemplate;