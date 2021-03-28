import React from "react";
import { Chip } from "@components/atoms";
import { FormattedMessage } from "react-intl";
import { commonMessages } from "@temp/intl";
import * as S from "./styles";
import { IProps } from "./types";

export const ProductListHeader: React.FC<IProps> = ({
  numberOfProducts = 0,
  openFiltersMenu,
  clearFilters,
  activeSortOption,
  activeFilters = 0,
  activeFiltersAttributes = [],
  sortOptions,
  onChange,
  onCloseFilterAttribute,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Bar>
        <S.LeftSide>
          <S.FiltersChipsWrapper>
            {activeFiltersAttributes.map(
              ({ attributeSlug, valueName, valueSlug }) => (
                <Chip
                  onClose={() =>
                    onCloseFilterAttribute(attributeSlug, valueSlug)
                  }
                  key={valueSlug}
                >
                  {valueName}
                </Chip>
              )
            )}
            {activeFilters > 1 && (
              <S.Clear onClick={clearFilters} data-test="clearFiltersButton">
                <FormattedMessage {...commonMessages.clearFilterHeader} />
              </S.Clear>
            )}
          </S.FiltersChipsWrapper>
          {activeFilters > 1 && (
            <S.Clear onClick={clearFilters} data-test="clearFiltersButton">
              <FormattedMessage {...commonMessages.clearFilterHeader} />
            </S.Clear>
          )}
        </S.LeftSide>
        {/* <S.RightSide>
          {activeFilters > 0 && (
            <S.Clear onClick={clearFilters} data-test="clearFiltersButton">
              <FormattedMessage {...commonMessages.clearFilterHeader} />
            </S.Clear>
          )}
        </S.RightSide> */}
      </S.Bar>
    </S.Wrapper>
  );
};
