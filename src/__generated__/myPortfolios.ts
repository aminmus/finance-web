/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myPortfolios
// ====================================================

export interface myPortfolios_myPortfolios {
  __typename: "Portfolio";
  id: number;
  updatedAt: any;
  createdAt: any;
  name: string;
  description: string | null;
  assetQuantity: number | null;
}

export interface myPortfolios {
  myPortfolios: (myPortfolios_myPortfolios | null)[] | null;
}
