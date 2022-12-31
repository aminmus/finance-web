import { gql } from '@apollo/client';

export const GET_PORTFOLIOS = gql`
  query myPortfolios {
    myPortfolios {
      id
      updatedAt
      createdAt
      name
      description
      assetQuantity
      publicAssets {
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
      privateAssets {
        id
        baseAsset {
          name
          description
          quantity
          createdAt
          updatedAt
          portfolioId
        }
        historicalValues(first: 20) {
          assetId
          id
          date
          unitPrice
        }
      }
    }
  }
`;

export const CREATE_PORTFOLIO = gql`
  mutation createOnePortfolio(
    $name: String!
    $description: String
    $userId: Int!
  ) {
    createOnePortfolio(
      data: {
        name: $name
        description: $description
        owner: { connect: { id: $userId } }
      }
    ) {
      id
      updatedAt
      createdAt
      name
      description
      assetQuantity
      publicAssets {
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
      privateAssets {
        id
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
  }
`;

export const DELETE_PORTFOLIO = gql`
  mutation deleteOnePortfolio($portfolioId: Int!) {
    deleteOnePortfolio(where: { id: $portfolioId }) {
      id
      updatedAt
      createdAt
      name
      description
      assetQuantity
      publicAssets {
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
      privateAssets {
        id
        baseAsset {
          name
          description
          quantity
          createdAt
          updatedAt
          portfolioId
        }
        historicalValues(first: 20) {
          assetId
          id
          date
          unitPrice
        }
      }
    }
  }
`;

export const UPDATE_PORTFOLIO = gql`
  mutation updateOnePortfolio($portfolioId: Int!, $name: String, $description: String) {
    updateOnePortfolio(
      data: {
        name: {
          set: $name
        }
        description:{
           set: $description
           }
      },
      where: {
        id: $portfolioId
      }
    ) {
      id
      updatedAt
      createdAt
      name
      description
      assetQuantity
      publicAssets {
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
      privateAssets {
        id
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
  }
`;
