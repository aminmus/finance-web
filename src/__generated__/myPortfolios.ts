/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myPortfolios
// ====================================================

export interface myPortfolios_myPortfolios_publicAssets_baseAsset {
  __typename: "Asset";
  name: string;
  description: string | null;
  quantity: number;
  createdAt: any;
  updatedAt: any;
  portfolioId: number;
}

export interface myPortfolios_myPortfolios_publicAssets {
  __typename: "PublicAsset";
  id: number;
  symbol: string | null;
  market: string | null;
  baseAsset: myPortfolios_myPortfolios_publicAssets_baseAsset;
}

export interface myPortfolios_myPortfolios_privateAssets_baseAsset {
  __typename: "Asset";
  name: string;
  description: string | null;
  quantity: number;
  createdAt: any;
  updatedAt: any;
  portfolioId: number;
}

export interface myPortfolios_myPortfolios_privateAssets_historicalValues {
  __typename: "HistoricalValue";
  assetId: number;
  id: number;
  date: any;
  unitPrice: number;
}

export interface myPortfolios_myPortfolios_privateAssets {
  __typename: "PrivateAsset";
  id: number;
  baseAsset: myPortfolios_myPortfolios_privateAssets_baseAsset;
  historicalValues: myPortfolios_myPortfolios_privateAssets_historicalValues[];
}

export interface myPortfolios_myPortfolios {
  __typename: "Portfolio";
  id: number;
  updatedAt: any;
  createdAt: any;
  name: string;
  description: string | null;
  assetQuantity: number | null;
  publicAssets: (myPortfolios_myPortfolios_publicAssets | null)[] | null;
  privateAssets: (myPortfolios_myPortfolios_privateAssets | null)[] | null;
}

export interface myPortfolios {
  myPortfolios: (myPortfolios_myPortfolios | null)[] | null;
}
