/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateOnePortfolio
// ====================================================

export interface updateOnePortfolio_updateOnePortfolio_publicAssets_baseAsset {
  __typename: "Asset";
  name: string;
  description: string | null;
  quantity: number;
  createdAt: any;
  updatedAt: any;
  portfolioId: number;
}

export interface updateOnePortfolio_updateOnePortfolio_publicAssets {
  __typename: "PublicAsset";
  id: number;
  symbol: string | null;
  market: string | null;
  baseAsset: updateOnePortfolio_updateOnePortfolio_publicAssets_baseAsset;
}

export interface updateOnePortfolio_updateOnePortfolio_privateAssets_baseAsset {
  __typename: "Asset";
  name: string;
  description: string | null;
  quantity: number;
  createdAt: any;
  updatedAt: any;
  portfolioId: number;
}

export interface updateOnePortfolio_updateOnePortfolio_privateAssets {
  __typename: "PrivateAsset";
  id: number;
  baseAsset: updateOnePortfolio_updateOnePortfolio_privateAssets_baseAsset;
}

export interface updateOnePortfolio_updateOnePortfolio {
  __typename: "Portfolio";
  id: number;
  updatedAt: any;
  createdAt: any;
  name: string;
  description: string | null;
  assetQuantity: number | null;
  publicAssets: (updateOnePortfolio_updateOnePortfolio_publicAssets | null)[] | null;
  privateAssets: (updateOnePortfolio_updateOnePortfolio_privateAssets | null)[] | null;
}

export interface updateOnePortfolio {
  updateOnePortfolio: updateOnePortfolio_updateOnePortfolio | null;
}

export interface updateOnePortfolioVariables {
  portfolioId: number;
  name?: string | null;
  description?: string | null;
}
