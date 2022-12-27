import React, {
  useContext, createContext,
} from 'react';
import {
  useQuery, ApolloError, useMutation, MutationResult, MutationFunctionOptions, FetchResult,
} from '@apollo/client';
import { GET_PORTFOLIOS, CREATE_PORTFOLIO, DELETE_PORTFOLIO } from '../graphql-strings/portfolios';
import { deleteOnePortfolio, deleteOnePortfolioVariables } from '../graphql-strings/__generated__/deleteOnePortfolio';
import { createOnePortfolio, createOnePortfolioVariables } from '../graphql-strings/__generated__/createOnePortfolio';
import { myPortfolios } from '../graphql-strings/__generated__/myPortfolios';
import { CREATE_PUBLIC_ASSET } from '../graphql-strings/assets';
import { createOnePublicAsset, createOnePublicAssetVariables } from '../graphql-strings/__generated__/createOnePublicAsset';

interface PortfoliosContextType {
  loading: boolean;
  error: ApolloError | undefined;
  data: null | myPortfolios['myPortfolios'];
  createOne: Function;
  createOneResponse: MutationResult<createOnePortfolio>;
  deleteOne: Function;
  deleteOneResponse: MutationResult<deleteOnePortfolio>;
  createPublicAsset: (
    options?: MutationFunctionOptions<
    createOnePublicAsset,
    createOnePublicAssetVariables
    > | undefined
  ) => Promise<FetchResult<this['createPublicAssetResponse']['data']>>;
  createPublicAssetResponse: MutationResult<createOnePublicAsset>;
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
  const [
    createPublicAsset,
    createPublicAssetResponse,
  ] = useMutation<createOnePublicAsset, createOnePublicAssetVariables>(CREATE_PUBLIC_ASSET);

  return (
    <portfoliosContext.Provider value={{
      loading,
      error,
      data: data?.myPortfolios ?? null,
      createOne,
      createOneResponse,
      deleteOne,
      deleteOneResponse,
      createPublicAsset,
      createPublicAssetResponse,
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
