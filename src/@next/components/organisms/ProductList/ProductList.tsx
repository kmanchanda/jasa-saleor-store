import React, { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { Button, IconButton, Loader } from "@components/atoms";
import { ProductTile } from "@components/molecules";

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
        sliderRef.current.scrollLeft += 200;
    }

    const dummyData = [...products, ...products]
    return (
        <>
            {/* <S.List data-test="productList" data-test-id={testingContextId}> */}
            <div style={{ position: 'relative' }}>
                <div className='product-list' ref={sliderRef} >
                    {dummyData.map(product => {
                        const { id, name } = product;
                        return (
                            id &&
                            name && (
                                <div className='image-item'>
                                    <Link to={generateProductUrl(id, name)} key={id}>
                                        <ProductTile product={product} />
                                    </Link>
                                </div>
                            )
                        );
                    })}
                </div>
                <span onClick={scrollElement} style={{ position: 'absolute', top: 140, right: 30 }}>
                    <IconButton
                        testingContext="removeButton"
                        size={40}
                        name="chevron_right"
                    />
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
