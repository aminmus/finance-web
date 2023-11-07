/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateOnePrivateAsset
// ====================================================

export interface updateOnePrivateAsset_updateOnePrivateAsset_historicalValues {
  __typename: "HistoricalValue";
  id: number;
  createdAt: any;
  updatedAt: any;
  date: any;
  assetId: number;
  unitPrice: number;
}

export interface updateOnePrivateAsset_updateOnePrivateAsset_baseAsset {
  __typename: "Asset";
  name: string;
  description: string | null;
  quantity: number;
  createdAt: any;
  updatedAt: any;
  portfolioId: number;
}

export interface updateOnePrivateAsset_updateOnePrivateAsset {
  __typename: "PrivateAsset";
  id: number;
  historicalValues: updateOnePrivateAsset_updateOnePrivateAsset_historicalValues[];
  baseAsset: updateOnePrivateAsset_updateOnePrivateAsset_baseAsset;
}

export interface updateOnePrivateAsset {
  updateOnePrivateAsset: updateOnePrivateAsset_updateOnePrivateAsset | null;
}

export interface updateOnePrivateAssetVariables {
  assetId: number;
  name?: string | null;
  description?: string | null;
}
