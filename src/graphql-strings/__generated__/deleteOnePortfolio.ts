/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteOnePortfolio
// ====================================================

export interface deleteOnePortfolio_deleteOnePortfolio_publicAssets_baseAsset {
  __typename: "Asset";
  name: string;
  description: string | null;
  quantity: number;
  createdAt: any;
  updatedAt: any;
  portfolioId: number;
}

export interface deleteOnePortfolio_deleteOnePortfolio_publicAssets {
  __typename: "PublicAsset";
  id: number;
  symbol: string | null;
  market: string | null;
  baseAsset: deleteOnePortfolio_deleteOnePortfolio_publicAssets_baseAsset;
}

export interface deleteOnePortfolio_deleteOnePortfolio_privateAssets_baseAsset {
  __typename: "Asset";
  name: string;
  description: string | null;
  quantity: number;
  createdAt: any;
  updatedAt: any;
  portfolioId: number;
}

export interface deleteOnePortfolio_deleteOnePortfolio_privateAssets_historicalValues {
  __typename: "HistoricalValue";
  assetId: number;
  id: number;
  date: any;
  unitPrice: number;
}

export interface deleteOnePortfolio_deleteOnePortfolio_privateAssets {
  __typename: "PrivateAsset";
  id: number;
  baseAsset: deleteOnePortfolio_deleteOnePortfolio_privateAssets_baseAsset;
  historicalValues: deleteOnePortfolio_deleteOnePortfolio_privateAssets_historicalValues[];
}

export interface deleteOnePortfolio_deleteOnePortfolio {
  __typename: "Portfolio";
  id: number;
  updatedAt: any;
  createdAt: any;
  name: string;
  description: string | null;
  assetQuantity: number | null;
  publicAssets: (deleteOnePortfolio_deleteOnePortfolio_publicAssets | null)[] | null;
  privateAssets: (deleteOnePortfolio_deleteOnePortfolio_privateAssets | null)[] | null;
}

export interface deleteOnePortfolio {
  deleteOnePortfolio: deleteOnePortfolio_deleteOnePortfolio | null;
}

export interface deleteOnePortfolioVariables {
  portfolioId: number;
}
