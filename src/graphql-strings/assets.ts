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

export const UPDATE_PRIVATE_ASSET = gql`
  mutation updateOnePrivateAsset(
    $assetId: Int!
    $name: String
    $description: String
  ) {
    updateOnePrivateAsset(
      data: {
        baseAsset: {
          update: { name: { set: $name }, description: { set: $description } }
        }
      }
      where: { id: $assetId }
    ) {
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

export const DELETE_PRIVATE_ASSET = gql`
  mutation deleteOnePrivateAsset($assetId: Int!) {
    deleteOnePrivateAsset(where: { id: $assetId }) {
      id
    }
  }
`;

export const DELETE_PUBLIC_ASSET = gql`
  mutation deleteOnePublicAsset($assetId: Int!) {
    deleteOnePublicAsset(where: { id: $assetId }) {
      id
    }
  }
`;
