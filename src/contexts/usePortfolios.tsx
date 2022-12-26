import React, {
  useContext, createContext,
} from 'react';
import {
  useQuery, ApolloError, useMutation, MutationResult,
} from '@apollo/client';
import { GET_PORTFOLIOS, CREATE_PORTFOLIO, DELETE_PORTFOLIO } from '../graphql-strings/portfolios';
import { deleteOnePortfolio, deleteOnePortfolioVariables } from '../graphql-strings/__generated__/deleteOnePortfolio';
import { createOnePortfolio, createOnePortfolioVariables } from '../graphql-strings/__generated__/createOnePortfolio';
import { myPortfolios } from '../graphql-strings/__generated__/myPortfolios';

interface PortfoliosContextType {
  loading: boolean;
  error: ApolloError | undefined;
  data: null | myPortfolios['myPortfolios'];
  createOne: Function;
  createOneResponse: MutationResult<createOnePortfolio>;
  deleteOne: Function;
  deleteOneResponse: MutationResult<deleteOnePortfolio>;
}

const portfoliosContext = createContext<PortfoliosContextType | undefined>(undefined);

type ProvidePortfolioProps = {
  children: React.ReactNode;
};
export function ProvidePortfolios({ children }: ProvidePortfolioProps) {
  const { loading, error, data } = useQuery<myPortfolios>(GET_PORTFOLIOS);
  const [
    createOne,
    createOneResponse,
  ] = useMutation<createOnePortfolio, createOnePortfolioVariables>(CREATE_PORTFOLIO);
  const [
    deleteOne,
    deleteOneResponse,
  ] = useMutation<deleteOnePortfolio, deleteOnePortfolioVariables>(DELETE_PORTFOLIO);

  return (
    <portfoliosContext.Provider value={{
      loading,
      error,
      data: data?.myPortfolios ?? null,
      createOne,
      createOneResponse,
      deleteOne,
      deleteOneResponse,
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
