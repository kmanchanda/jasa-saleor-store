import React from 'react';
import './scss/index.scss';

interface IconAssetWrapperDto {
    backgroundBlack?: boolean,
    source: any,// Method
    size?: number
}

const IconAssetWrapper = ({ backgroundBlack = false, size = 7, source }: IconAssetWrapperDto) => {
    return (
        <div className={`icon-wrapper ${backgroundBlack ? 'bg-black' : 'bg-white'}`}>
            <img src={source()} alt='icon-img' style={{ width: size }} />
        </div>
    )
}

export default IconAssetWrapper;