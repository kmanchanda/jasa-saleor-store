import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-fetch";

import {
  generateCategoryUrl,
  generateCollectionUrl,
  generateProductUrl,
} from "../core/utils";
import {
  getCategoriesQuery,
  getCollectionsQuery,
  getProductsQuery,
} from "./queries";

const API_URL = process.env.API_URI || "/graphql/";

const fetchItems = async ({ query, perPage = 100 }, callback: any) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ uri: API_URL, fetch }),
  });
  const next = async (cursor = null) => {
    const response = await client.query({
      query,
      variables: { perPage, cursor },
    });
    const data =
      response.data[query.definitions[0].selectionSet.selections[0].name.value];
    data.edges.map(({ node }) => callback(node));
    if (data.pageInfo.hasNextPage) {
      await next(data.pageInfo.endCursor);
    }
  };
  await next();
};

export const getCategories = async callback => {
  await fetchItems({ query: getCategoriesQuery }, ({ id, name }) => {
    callback({ url: generateCategoryUrl(id, name) });
  });
};

export const getCollections = async callback => {
  await fetchItems({ query: getCollectionsQuery }, ({ id, name }) => {
    callback({ url: generateCollectionUrl(id, name) });
  });
};

export const getProducts = async callback => {
  await fetchItems({ query: getProductsQuery }, ({ id, name }) => {
    callback({ url: generateProductUrl(id, name) });
  });
};

export const SearchProduct = async query => {
  const result = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
  // .catch(e => {
  //   console.log(e);
  // });
  return result.data.products.edges;
};

export const SearchCategory = async query => {
  const result = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
  // .catch(e => {
  //   console.log(e);
  // });
  return result.data.categories.edges;
};
