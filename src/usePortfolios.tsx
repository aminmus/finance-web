import React, {
  useContext, createContext,
} from 'react';
import { useQuery, gql, ApolloError } from '@apollo/client';
import { myPortfolios_myPortfolios as Portfolio } from './__generated__/myPortfolios';

interface PortfoliosContextType {
  loading: boolean;
  error: ApolloError | undefined;
  data: null | Portfolio[];
}

const portfoliosContext = createContext<PortfoliosContextType>(
  { data: null, loading: false, error: undefined },
);

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

type ProvidePortfolioProps = {
  children: React.ReactNode;
};
export function ProvidePortfolios({ children }: ProvidePortfolioProps) {
  // const [portfolios, setPortofolios] = useState(null);
  const { loading, error, data } = useQuery(GET_PORTFOLIOS);

  return (
    <portfoliosContext.Provider value={{ loading, error, data: data ? data.myPortfolios : data }}>
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
