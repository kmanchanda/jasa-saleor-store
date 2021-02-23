import "./scss/index.scss";

import * as React from "react";
import { useIntl } from "react-intl";

import { commonMessages } from "@temp/intl";
import { IFilterAttributes, IFilters } from "@types";
import {
    Breadcrumbs,
    extractBreadcrumbs,
    ProductsFeatured,
} from "../../components";

import { ProductListHeader } from "../../@next/components/molecules";
import { ProductList } from "../../@next/components/organisms";
import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";

import { maybe } from "../../core/utils";

import { Category_category } from "./gqlTypes/Category";
import { CategoryProducts_products } from "./gqlTypes/CategoryProducts";
import ProductListModule from "../ProductList";
import FilterChips from "@temp/components/Filter-Chips/filterChips.componet";

interface SortItem {
    label: string;
    value?: string;
}

interface SortOptions extends Array<SortItem> { }

interface PageProps {
    activeFilters: number;
    attributes: IFilterAttributes[];
    activeSortOption: string;
    category: Category_category;
    displayLoader: boolean;
    filters: IFilters;
    hasNextPage: boolean;
    products: CategoryProducts_products;
    sortOptions: SortOptions;
    clearFilters: () => void;
    onLoadMore: () => void;
    onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
    onOrder: (order: { value?: string; label: string }) => void;
}

const Page: React.FC<PageProps> = ({
    activeFilters,
    activeSortOption,
    attributes,
    category,
    displayLoader,
    hasNextPage,
    clearFilters,
    onLoadMore,
    products,
    filters,
    onOrder,
    sortOptions,
    onAttributeFiltersChange,
}) => {
    const canDisplayProducts = maybe(
        () => !!products.edges && products.totalCount !== undefined
    );
    const hasProducts = canDisplayProducts && !!products.totalCount;
    const [showFilters, setShowFilters] = React.useState(false);
    const intl = useIntl();

    const getAttribute = (attributeSlug: string, valueSlug: string) => {
        return {
            attributeSlug,
            valueName: attributes
                .find(({ slug }) => attributeSlug === slug)
                .values.find(({ slug }) => valueSlug === slug).name,
            valueSlug,
        };
    };

    const activeFiltersAttributes =
        filters &&
        filters.attributes &&
        Object.keys(filters.attributes).reduce(
            (acc, key) =>
                acc.concat(
                    filters.attributes[key].map(valueSlug => getAttribute(key, valueSlug))
                ),
            []
        );


    return (
        <div className="category">
            <div className="container">
                <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} />
            </div>
            <div className='container col-flex'>

                <FilterChips applicableFilters={sortOptions} />

                <ProductListHeader
                    activeSortOption={activeSortOption}
                    openFiltersMenu={() => setShowFilters(true)}
                    numberOfProducts={products ? products.totalCount : 0}
                    activeFilters={activeFilters}
                    activeFiltersAttributes={activeFiltersAttributes}
                    clearFilters={clearFilters}
                    sortOptions={sortOptions}
                    onChange={onOrder}
                    onCloseFilterAttribute={onAttributeFiltersChange}
                />
                <span className='title-heading' > {/* Todo@umang */}
                Dørgreb & tilbehør
                </span>

                <span className='category-desc'>  {/* Todo@umang */}
                    {'Vi bestræber os på at levere dørgreb, der passer til enhver smag og ethvert behov. Derfor udvikler vi hele tiden sortimentet i samarbejde med dygtige designere og kompetente leverandører. Dørgrebene findes i flere forskellige kvaliteter og overflader – f.eks. krom, blank messing, matbørstet krom, PVD messing m.m.'}
                </span>
                <span className='category-desc pt-24'>
                    {'Vi ønsker, at vores dørgreb giver kunden en funktionalitet og et design der spreder glæde i rigtig mange år frem, og går derfor aldrig på kompromis med kvaliteten.'}
                </span>
            </div>
            <div className='container'>
                {canDisplayProducts && (
                    <ProductListModule products={products.edges.map(edge => edge.node)} />
                )}
            </div>
        </div>

    )

    //   return (
    //     <div className="category">
    //       <div className="container">
    //        
    //         <FilterSidebar
    //           show={showFilters}
    //           hide={() => setShowFilters(false)}
    //           onAttributeFiltersChange={onAttributeFiltersChange}
    //           attributes={attributes}
    //           filters={filters}
    //         />
    //         <ProductListHeader
    //           activeSortOption={activeSortOption}
    //           openFiltersMenu={() => setShowFilters(true)}
    //           numberOfProducts={products ? products.totalCount : 0}
    //           activeFilters={activeFilters}
    //           activeFiltersAttributes={activeFiltersAttributes}
    //           clearFilters={clearFilters}
    //           sortOptions={sortOptions}
    //           onChange={onOrder}
    //           onCloseFilterAttribute={onAttributeFiltersChange}
    //         />
    //         {canDisplayProducts && (
    //           <ProductList
    //             products={products.edges.map(edge => edge.node)}
    //             canLoadMore={hasNextPage}
    //             loading={displayLoader}
    //             onLoadMore={onLoadMore}
    //           />
    //         )}
    //       </div>

    //       {!hasProducts && (
    //         <ProductsFeatured
    //           title={intl.formatMessage(commonMessages.youMightLike)}
    //         />
    //       )}
    //     </div>
    //   );
};

export default Page;
