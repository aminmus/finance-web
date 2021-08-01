import React, {
  useState, useContext, createContext,
} from 'react';
import { useQuery, gql, ApolloError } from '@apollo/client';

interface PortfoliosContextType {
  loading: boolean;
  error: ApolloError | undefined;
  data: any;
}

const portfoliosContext = createContext<PortfoliosContextType >(
  { data: null, loading: false, error: undefined },
);

const GET_PORTFOLIOS = gql`
query portfolios {
  portfolios(first: 10) {
    id
    updatedAt
    createdAt
    name
    description
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
    <portfoliosContext.Provider value={{ loading, error, data }}>
      {children}
    </portfoliosContext.Provider>
  );
}

export const usePortfolios = () => useContext(portfoliosContext);
