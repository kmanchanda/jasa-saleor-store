import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { Button, Loader } from "@components/atoms";
import { CategoryProductTile } from "@components/molecules/ProductTile/CategoryProductTile";
import { generateProductUrl } from "../../../../core/utils";
import * as S from "./paginated-styles";
import { IProps } from "./types";

export const PaginatedProductList: React.FC<IProps> = ({
  products,
  canLoadMore = false,
  loading = false,
  testingContextId,
  onLoadMore = () => null,
}: IProps) => {
  return (
    <>
      <S.List data-test="productList" data-test-id={testingContextId}>
        {products.map(product => {
          const { id, name } = product;
          return (
            id &&
            name && (
              <Link to={generateProductUrl(id, name)} key={id}>
                <CategoryProductTile product={product} />
              </Link>
            )
          );
        })}
      </S.List>
      <S.Loader>
        {loading && canLoadMore && <Loader />}
        {!loading && canLoadMore && (
          <Button
            testingContext="loadMoreProductsButton"
            color="secondary"
            onClick={onLoadMore}
          >
            <FormattedMessage defaultMessage="More +" />
          </Button>
        )}
      </S.Loader>
    </>
  );
};
