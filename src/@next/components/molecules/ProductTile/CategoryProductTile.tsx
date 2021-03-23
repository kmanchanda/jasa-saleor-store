import React from "react";
import { Thumbnail } from "@components/molecules";
import * as S from "./productStyles";
import { IProps } from "./types";

export const CategoryProductTile: React.FC<IProps> = ({ product }: IProps) => {
    return (
        <S.Wrapper>
            <S.Image data-test="productThumbnail">
                <Thumbnail source={product} />
            </S.Image>
            <S.Title data-test="productTile">{product.name}</S.Title>
            <S.Description data-test="productPrice">
                <span className="sub-heading-styles">Varenr. 10001 DB nr. 5271840</span>
            </S.Description>
        </S.Wrapper>
    );
};
