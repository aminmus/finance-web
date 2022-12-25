import React, {
  useContext, createContext,
} from 'react';
import {
  useQuery, gql, ApolloError, useMutation, MutationResult,
} from '@apollo/client';
import { myPortfolios_myPortfolios as Portfolio } from './__generated__/myPortfolios';
import { createOnePortfolio, createOnePortfolioVariables } from './__generated__/createOnePortfolio';

interface PortfoliosContextType {
  loading: boolean;
  error: ApolloError | undefined;
  data: null | Portfolio[];
  createOne: Function;
  createOneResponse: MutationResult<createOnePortfolio>;
}

const portfoliosContext = createContext<PortfoliosContextType | undefined>(undefined);

const GET_PORTFOLIOS = gql`
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

const CREATE_PORTFOLIO = gql`
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

type ProvidePortfolioProps = {
  children: React.ReactNode;
};
export function ProvidePortfolios({ children }: ProvidePortfolioProps) {
  const {
    loading, error, data,
  } = useQuery(GET_PORTFOLIOS);
  const [
    createOne,
    createOneResponse,
  ] = useMutation<createOnePortfolio, createOnePortfolioVariables>(CREATE_PORTFOLIO);

  return (
    <portfoliosContext.Provider value={{
      loading,
      error,
      data: data ? data.myPortfolios : data,
      createOne,
      createOneResponse,
    }}
    >
      {children}
    </portfoliosContext.Provider>
  );
}

export const usePortfolios = () => useContext(portfoliosContext);

// export interface IPortfolio {
//   id: number
//   updatedAt:
//   createdAt
//   name
//   description
// }
