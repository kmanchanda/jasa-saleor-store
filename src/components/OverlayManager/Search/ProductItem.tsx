import * as React from "react";
import { Link } from "react-router-dom";
import "./scss/index.scss";
import { Thumbnail } from "@components/molecules";

import { Divider } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { generateProductUrl } from "../../../core/utils";
import { SearchResults_products_edges } from "./gqlTypes/SearchResults";

const ProductItem: React.FC<SearchResults_products_edges> = ({
  node: product,
  onClose = () => null,
}) => (
  <>
    <li onClick={() => onClose()} className="search__products__item">
      <Link to={generateProductUrl(product.id, product.name)}>
        <Thumbnail source={product} />
        <span>
          <span className="product-name">{product.name}</span>
          <span className="product-detail">
            {product.category?.name || "-"}
          </span>
        </span>
      </Link>
    </li>
    <Divider />
  </>
);

export default ProductItem;
