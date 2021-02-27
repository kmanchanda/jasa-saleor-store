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
import { Typography } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconAssetWrapper from '../../components/IconAssetWrapper/index';
import {
    OverlayContext,
    OverlayTheme,
    OverlayType,
} from "../../components/index"
import { ChevronRightBlackIcon } from "@temp/ImageMapping/imageMapping";
interface SortItem {
    label: string;
    value?: string;
}
import Media from "react-media";
import {
    smallScreen,
    mediumScreen

} from "../../globalStyles/scss/variables.scss";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    const [header, setHeader] = React.useState(false);
    const overlayContext = React.useContext(OverlayContext);
    const getAttribute = (attributeSlug: string, valueSlug: string) => {
        return {
            attributeSlug,
            valueName: attributes
                .find(({ slug }) => attributeSlug === slug)
                .values.find(({ slug }) => valueSlug === slug).name,
            valueSlug,
        };
    };

    const content = sortOptions;
    const title = "Dørgreb";


    const activeFiltersAttributes =
        filters &&
        console.log("filters", filters)
    filters.attributes &&
        Object.keys(filters.attributes).reduce(
            (acc, key) =>
                acc.concat(
                    filters.attributes[key].map(valueSlug => getAttribute(key, valueSlug))
                ),
            []
        );
    const listenScrollEvent = (event) => {
        if (window.scrollY < 500) {
            return setHeader(false);
        } else return setHeader(true);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
        return () => {
            window.removeEventListener('scroll', listenScrollEvent);
        };
    }, []);


    return (
        <div className="category">
            <FilterSidebar
                show={showFilters}
                hide={() => setShowFilters(false)}
                onAttributeFiltersChange={onAttributeFiltersChange}
                attributes={attributes}
                filters={filters}
            />
            <div className="container">
                <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} />
            </div>

            <div className='container col-flex'>
                <span className='title-heading' >
                    Dørgreb & tilbehør
                </span>

                <span className='category-desc'>
                    {'Vi bestræber os på at levere dørgreb, der passer til enhver smag og ethvert behov. Derfor udvikler vi hele tiden sortimentet i samarbejde med dygtige designere og kompetente leverandører. Dørgrebene findes i flere forskellige kvaliteter og overflader – f.eks. krom, blank messing, matbørstet krom, PVD messing m.m.'}
                </span>
                <span className='category-desc pt-24'>
                    {'Vi ønsker, at vores dørgreb giver kunden en funktionalitet og et design der spreder glæde i rigtig mange år frem, og går derfor aldrig på kompromis med kvaliteten.'}
                </span>
                <Media
                    query={{ minWidth: mediumScreen }}
                    render={() => (
                        <>
                            <FilterChips applicableFilters={sortOptions} />
                            <div className='filterButtonContainer'>
                                <div className={header ? 'centerCategoryFixed' : null}>
                                    <Fab onClick={() => setShowFilters(true)} variant="extended" style={{ background: 'black', color: 'white' }}>
                                        <NavigationIcon />
                                        Filter
                                    </Fab>
                                </div>
                            </div>
                        </>
                    )}
                />

                <Media
                    query={{ maxWidth: '550px' }}
                    render={() => (
                        <>
                            <div className="FabContainer">
                                <div className="Fab">
                                    <div onClick={() =>
                                        overlayContext.show(OverlayType.DisplayFilterChips, OverlayTheme.right, { title, content })
                                    } >
                                        <Fab variant="extended" style={{ background: 'black', color: 'white' }}>
                                            <ExpandMoreIcon />
                                            Dørgreb
                                </Fab>
                                    </div>
                                </div>
                                <div className="Fab">
                                    <div>
                                        <Fab onClick={() => setShowFilters(true)} variant="extended" style={{ background: 'black', color: 'white' }}>
                                            <NavigationIcon />
                                            Filter
                                </Fab>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                />
            </div>
            <div className='container'>
                {canDisplayProducts && (
                    <ProductListModule products={products.edges.map(edge => edge.node)} />
                )}
            </div>
        </div >

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
