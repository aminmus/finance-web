import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
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
