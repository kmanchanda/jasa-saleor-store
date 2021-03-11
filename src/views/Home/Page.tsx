import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";

import { Loader } from "../../components";
import { generateCategoryUrl } from "../../core/utils";

import {
  ProductsList_categories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./gqlTypes/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop }) => {
  const categoriesExist = () => {
    return categories && categories.edges && categories.edges.length > 0;
  };
  return (
    <>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <div className="home-page__hero">
        <div className="home-page__hero-action">
          {loading && !categories ? (
            <Loader />
          ) : (
            categoriesExist() && (
              <Link
                to={generateCategoryUrl(
                  categories.edges[0].node.id,
                  categories.edges[0].node.name
                )}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
