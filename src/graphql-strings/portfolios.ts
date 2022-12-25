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
mutation createOnePortfolio($name: String!, $description: String, $userId: Int!) {
  createOnePortfolio(data: {
    name: $name,
    description: $description,
    owner: {
      connect: {id: $userId}
    }
  }) {
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
