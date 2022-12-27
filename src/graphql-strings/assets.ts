import { gql } from '@apollo/client';

export const CREATE_PUBLIC_ASSET = gql`
  mutation createOnePublicAsset($data: PublicAssetCreateInput!) {
    createOnePublicAsset(data: $data) {
        id
        symbol
        market
        baseAsset {
          name
          description
          quantity
          createdAt
          updatedAt
          portfolioId
        }
    }
  }
`;

export const CREATE_PRIVATE_ASSET = gql`
  mutation createOnePrivateAsset($data: PrivateAssetCreateInput!) {
    createOnePrivateAsset(data: $data) {
        id
        historicalValues(first: 25) {
          id
          createdAt
          updatedAt
          date
          assetId
          unitPrice
        }
        baseAsset {
          name
          description
          quantity
          createdAt
          updatedAt
          portfolioId
        }
    }
  }
`;
