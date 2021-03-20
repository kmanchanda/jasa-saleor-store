import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { NotFound } from "../../components";
import { CategoryPage } from "../../views/Category";
import { CollectionPage } from "../../views/Collection";
import { HomePage } from "../../views/Home";
import { ProductPage } from "../../views/Product";

import * as paths from "./paths";

export const Routes: React.FC = () => (
  <Switch>
    <Route exact path={paths.baseUrl} component={HomePage} />
    <Route path={paths.categoryUrl} component={CategoryPage} />
    <Route path={paths.collectionUrl} component={CollectionPage} />
    <Route path={paths.productUrl} component={ProductPage} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
