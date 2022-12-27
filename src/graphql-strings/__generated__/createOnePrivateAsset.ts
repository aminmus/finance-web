/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PrivateAssetCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createOnePrivateAsset
// ====================================================

export interface createOnePrivateAsset_createOnePrivateAsset_historicalValues {
  __typename: "HistoricalValue";
  id: number;
  createdAt: any;
  updatedAt: any;
  date: any;
  assetId: number;
  unitPrice: number;
}

export interface createOnePrivateAsset_createOnePrivateAsset_baseAsset {
  __typename: "Asset";
  name: string;
  description: string | null;
  quantity: number;
  createdAt: any;
  updatedAt: any;
  portfolioId: number;
}

export interface createOnePrivateAsset_createOnePrivateAsset {
  __typename: "PrivateAsset";
  id: number;
  historicalValues: createOnePrivateAsset_createOnePrivateAsset_historicalValues[];
  baseAsset: createOnePrivateAsset_createOnePrivateAsset_baseAsset;
}

export interface createOnePrivateAsset {
  createOnePrivateAsset: createOnePrivateAsset_createOnePrivateAsset;
}

export interface createOnePrivateAssetVariables {
  data: PrivateAssetCreateInput;
}
