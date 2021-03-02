import React from "react";
import { Thumbnail } from "@components/molecules";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductTile: React.FC<IProps> = ({ product }: IProps) => {
  return (
    <S.Wrapper>
      <S.Image data-test="productThumbnail">
        <Thumbnail source={product} />
      </S.Image>
      <S.Title data-test="productTile">{product.name}</S.Title>
      <S.Description data-test="productPrice">
        <span>Dørgreb L-Form i PVD messing.</span>{" "}
        {/* Todo remove hard coding */}
      </S.Description>
      <S.Price data-test="productPrice">
        {/* <TaxedMoney taxedMoney={price} /> */}
        <span>90 DKK</span>
      </S.Price>
    </S.Wrapper>
  );
};
