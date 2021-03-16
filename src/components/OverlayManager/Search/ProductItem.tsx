import * as React from "react";
import { Link } from "react-router-dom";
import "./scss/index.scss";
import { Thumbnail } from "@components/molecules";

import { Divider } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { generateProductUrl, generateCategoryUrl } from "../../../core/utils";
import { SearchResults_products_edges } from "./gqlTypes/SearchResults";
import searchImg from "../../../images/search.svg";
import ReactSVG from "react-svg";

const ProductItem: React.FC<SearchResults_products_edges> = ({
  node: product,
  onClose = () => null,
}) => (
    <>
      <li onClick={() => onClose()} className="search__products__item">
        <Link to={product.thumbnail === undefined ? generateCategoryUrl(product.id, product.name) : generateProductUrl(product.id, product.name)}>
          {product.thumbnail === undefined ?
            <>
              <div style={{ display: 'flex' }}>
                <ReactSVG className="search-image" path={searchImg} />
                <span className="product-name">{product ?.name} ({product ?.products ?.totalCount})
                </span>
                <ChevronRightIcon style={{ height: 'auto' }}></ChevronRightIcon>
              </div>
            </>
            : <>
              <Thumbnail source={product} />
              <p style={{ display: 'inline-block' }}>
                <p className="name">{product ?.name}</p>
                <p className="detail">
                  {product.category ?.name || "-"}
                </p>
              </p>
              <div style={{ float: 'right', marginTop: '15px' }}><ChevronRightIcon></ChevronRightIcon></div>
            </>}
        </Link>
      </li>
      <Divider />
    </>
  );

export default ProductItem;
