import React, { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { Button, Loader } from "@components/atoms";
import { ProductTile } from "@components/molecules";


import IconAssetWrapper from '../../../../components/IconAssetWrapper/index';
import { ChevronRightWhiteIcon } from '../../../../ImageMapping/imageMapping'

import { generateProductUrl } from "../../../../core/utils";

import * as S from "./styles";
import './scss/index.scss';

import { IProps } from "./types";

export const ProductList: React.FC<IProps> = ({
    products,
    canLoadMore = false,
    loading = false,
    testingContextId,
    onLoadMore = () => null,
}: IProps) => {

    const sliderRef = useRef(null);

    const scrollElement = () => {
        sliderRef.current.scrollLeft += 300;
    }

    const dummyData = [...products, ...products] //todo@umang remove
    return (
        <>
            {/* <S.List data-test="productList" data-test-id={testingContextId}> */}
            <div style={{ position: 'relative' }}>
                <div className='product-list' ref={sliderRef} >
                    {dummyData.map(product => {
                        const { id, name } = product || {};
                        return (
                            id &&
                            name && (
                                // <ProductCardTemplate id={id} imageUrl={product?.thumbnail?.url} heading={name} />
                                <div className='image-item'>
                                    <Link to={generateProductUrl(id, name)} key={id}>
                                        <ProductTile product={product} />
                                    </Link>
                                </div>
                            )
                        );
                    })}
                </div>
                <span className='nav-btn' onClick={scrollElement} style={{ position: 'absolute', top: 140, right: 30 }}>
                    <IconAssetWrapper backgroundBlack source={ChevronRightWhiteIcon} size={7} />
                </span>

            </div>
            {/* </S.List> */}
            <S.Loader>
                {loading ? (
                    <Loader />
                ) : (
                        canLoadMore && (
                            <Button
                                testingContext="loadMoreProductsButton"
                                color="secondary"
                                onClick={onLoadMore}
                            >
                                <FormattedMessage defaultMessage="More +" />
                            </Button>
                        )
                    )}
            </S.Loader>
        </>
    );
};
