import * as React from "react";
import { Link } from "react-router-dom";
import "./scss/index.scss";
import { Thumbnail } from "@components/molecules";

import { Divider } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ReactSVG from "react-svg";
import { generateProductUrl, generateCategoryUrl } from "../../../core/utils";
import searchImg from "../../../images/search.svg";

const ProductItem: React.FC<any> = ({
  node: product,
  onClose = () => null,
}) => (
  <>
    <Divider />
    <li onClick={() => onClose()} className="search__products__item">
      <Link
        to={
          product.thumbnail === undefined
            ? generateCategoryUrl(product.id, product.name)
            : generateProductUrl(product.id, product.name)
        }
      >
        {product.thumbnail === undefined ? (
          <>
            <div style={{ display: "flex" }}>
              <ReactSVG className="search-image" path={searchImg} />
              <span className="product-name">
                <span> {product?.name}</span> &nbsp; (
                <span style={{ color: "#F5A930", padding: "3px" }}>
                  {product?.products?.totalCount}
                </span>
                )
              </span>
              <ChevronRightIcon style={{ height: "auto" }} />
            </div>
          </>
        ) : (
          <>
            <Thumbnail source={product} />
            <div style={{ display: "inline-block" }}>
              <p className="name">{product?.name}</p>
              <p className="detail">{product.category?.name || "-"}</p>
            </div>
            <div style={{ float: "right", marginTop: "15px" }}>
              <ChevronRightIcon />
            </div>
          </>
        )}
      </Link>
    </li>
  </>
);

export default ProductItem;
