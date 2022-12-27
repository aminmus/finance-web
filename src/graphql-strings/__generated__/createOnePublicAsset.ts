/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PublicAssetCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createOnePublicAsset
// ====================================================

export interface createOnePublicAsset_createOnePublicAsset_baseAsset {
  __typename: "Asset";
  name: string;
  description: string | null;
  quantity: number;
  createdAt: any;
  updatedAt: any;
  portfolioId: number;
}

export interface createOnePublicAsset_createOnePublicAsset {
  __typename: "PublicAsset";
  id: number;
  symbol: string | null;
  market: string | null;
  baseAsset: createOnePublicAsset_createOnePublicAsset_baseAsset;
}

export interface createOnePublicAsset {
  createOnePublicAsset: createOnePublicAsset_createOnePublicAsset;
}

export interface createOnePublicAssetVariables {
  data: PublicAssetCreateInput;
}
