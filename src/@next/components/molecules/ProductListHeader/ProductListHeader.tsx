import React from "react";
import { Chip } from "@components/atoms";
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
                  onClose={() => onCloseFilterAttribute(attributeSlug, valueSlug)}
                >
                  {valueName}
                </Chip>
              )
            )}
          </S.FiltersChipsWrapper>
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
