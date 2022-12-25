import React, {
  useContext, createContext,
} from 'react';
import {
  useQuery, ApolloError, useMutation, MutationResult,
} from '@apollo/client';
import { myPortfolios_myPortfolios as Portfolio } from '../__generated__/myPortfolios';
import { createOnePortfolio, createOnePortfolioVariables } from '../__generated__/createOnePortfolio';
import { GET_PORTFOLIOS, CREATE_PORTFOLIO } from '../graphql-strings/portfolios';

interface PortfoliosContextType {
  loading: boolean;
  error: ApolloError | undefined;
  data: null | Portfolio[];
  createOne: Function;
  createOneResponse: MutationResult<createOnePortfolio>;
}

const portfoliosContext = createContext<PortfoliosContextType | undefined>(undefined);

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
