/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserWhereUniqueInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createOnePortfolio
// ====================================================

export interface createOnePortfolio_createOnePortfolio_publicAssets_baseAsset {
  __typename: "Asset";
  name: string;
  description: string | null;
  quantity: number;
  createdAt: any;
  updatedAt: any;
  portfolioId: number;
}

export interface createOnePortfolio_createOnePortfolio_publicAssets {
  __typename: "PublicAsset";
  id: number;
  symbol: string | null;
  market: string | null;
  baseAsset: createOnePortfolio_createOnePortfolio_publicAssets_baseAsset;
}

export interface createOnePortfolio_createOnePortfolio_privateAssets_baseAsset {
  __typename: "Asset";
  name: string;
  description: string | null;
  quantity: number;
  createdAt: any;
  updatedAt: any;
  portfolioId: number;
}

export interface createOnePortfolio_createOnePortfolio_privateAssets {
  __typename: "PrivateAsset";
  id: number;
  baseAsset: createOnePortfolio_createOnePortfolio_privateAssets_baseAsset;
}

export interface createOnePortfolio_createOnePortfolio {
  __typename: "Portfolio";
  id: number;
  updatedAt: any;
  createdAt: any;
  name: string;
  description: string | null;
  assetQuantity: number | null;
  publicAssets: (createOnePortfolio_createOnePortfolio_publicAssets | null)[] | null;
  privateAssets: (createOnePortfolio_createOnePortfolio_privateAssets | null)[] | null;
}

export interface createOnePortfolio {
  createOnePortfolio: createOnePortfolio_createOnePortfolio;
}

export interface createOnePortfolioVariables {
  name: string;
  description?: string | null;
  userId: UserWhereUniqueInput['id'] | UserWhereUniqueInput['email'];
}
