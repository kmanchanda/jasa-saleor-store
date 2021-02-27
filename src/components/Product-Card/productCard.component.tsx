import { generateProductUrl } from "@temp/core/utils";
import React from "react";
import { Link } from "react-router-dom";

import "./scss/index.scss";

type propTypes = {
  imageUrl?: string;
  heading?: string;
  subheading?: string;
  caption?: string;
  id: string;
};

const ProductCardTemplate = ({
  imageUrl = "",
  heading = "",
  subheading = "",
  caption = "",
  id,
}: propTypes) => {
  return (
    <div className="product-card-temp">
      <Link to={generateProductUrl(id, heading)}>
        <div className="image-container">
          <img src={imageUrl} style={{ width: "100%" }} />
        </div>
        <span className="heading-styles">{heading}</span>
        <span className="sub-heading-styles">Varenr. 10001 DB nr. 5271840</span>
        {caption ? <span className="caption-styles" /> : null}
      </Link>
    </div>
  );
};

export default ProductCardTemplate;
