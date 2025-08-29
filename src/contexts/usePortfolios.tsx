import React, { createContext, useContext } from 'react';
import {
  ApolloError,
  FetchResult,
  MutationFunctionOptions,
  MutationResult,
  useMutation,
  useQuery,
} from '@apollo/client';
import {
  CREATE_PORTFOLIO,
  DELETE_PORTFOLIO,
  GET_PORTFOLIOS,
  UPDATE_PORTFOLIO,
} from '../graphql-strings/portfolios';
import {
  deleteOnePortfolio,
  deleteOnePortfolioVariables,
} from '../graphql-strings/__generated__/deleteOnePortfolio';
import {
  createOnePortfolio,
  createOnePortfolioVariables,
} from '../graphql-strings/__generated__/createOnePortfolio';
import { myPortfolios } from '../graphql-strings/__generated__/myPortfolios';
import {
  CREATE_PRIVATE_ASSET,
  CREATE_PUBLIC_ASSET,
  DELETE_PRIVATE_ASSET,
  DELETE_PUBLIC_ASSET,
  UPDATE_PRIVATE_ASSET,
} from '../graphql-strings/assets';
import {
  createOnePublicAsset,
  createOnePublicAssetVariables,
} from '../graphql-strings/__generated__/createOnePublicAsset';
import {
  createOnePrivateAsset,
  createOnePrivateAssetVariables,
} from '../graphql-strings/__generated__/createOnePrivateAsset';
import {
  deleteOnePublicAsset,
  deleteOnePublicAssetVariables,
} from '../graphql-strings/__generated__/deleteOnePublicAsset';
import {
  deleteOnePrivateAsset,
  deleteOnePrivateAssetVariables,
} from '../graphql-strings/__generated__/deleteOnePrivateAsset';
import {
  updateOnePortfolio,
  updateOnePortfolioVariables,
} from '../graphql-strings/__generated__/updateOnePortfolio';
import {
  updateOnePrivateAsset,
  updateOnePrivateAssetVariables,
} from '../graphql-strings/__generated__/updateOnePrivateAsset';

interface PortfoliosContextType {
  loading: boolean;
  error: ApolloError | undefined;
  data: null | myPortfolios['myPortfolios'];
  refetch: () => Promise<any>;
  createOne: (
    options?: MutationFunctionOptions<createOnePortfolio, createOnePortfolioVariables>,
  ) => Promise<FetchResult<createOnePortfolio>>;
  createOneResponse: MutationResult<createOnePortfolio>;
  deleteOne: (
    options?: MutationFunctionOptions<deleteOnePortfolio, deleteOnePortfolioVariables>,
  ) => Promise<FetchResult<deleteOnePortfolio>>;
  updateOneResponse: MutationResult<updateOnePortfolio>;
  updateOne: (
    options?: MutationFunctionOptions<updateOnePortfolio, updateOnePortfolioVariables>,
  ) => Promise<FetchResult<updateOnePortfolio>>;
  deleteOneResponse: MutationResult<deleteOnePortfolio>;
  createPublicAsset: (
    options?: MutationFunctionOptions<createOnePublicAsset, createOnePublicAssetVariables>,
  ) => Promise<FetchResult<createOnePublicAsset>>;
  createPublicAssetResponse: MutationResult<createOnePublicAsset>;
  createPrivateAsset: (
    options?: MutationFunctionOptions<createOnePrivateAsset, createOnePrivateAssetVariables>,
  ) => Promise<FetchResult<createOnePrivateAsset>>;
  createPrivateAssetResponse: MutationResult<createOnePrivateAsset>;
  deletePublicAsset: (
    options?: MutationFunctionOptions<deleteOnePublicAsset, deleteOnePublicAssetVariables>,
  ) => Promise<FetchResult<deleteOnePublicAsset>>;
  deletePublicAssetResponse: MutationResult<deleteOnePublicAsset>;
  deletePrivateAsset: (
    options?: MutationFunctionOptions<deleteOnePrivateAsset, deleteOnePrivateAssetVariables>,
  ) => Promise<FetchResult<deleteOnePrivateAsset>>;
  deletePrivateAssetResponse: MutationResult<deleteOnePrivateAsset>;
  updatePrivateAsset: (
    options?: MutationFunctionOptions<updateOnePrivateAsset, updateOnePrivateAssetVariables>,
  ) => Promise<FetchResult<updateOnePrivateAsset>>;
  updatePrivateAssetResponse: MutationResult<updateOnePrivateAsset>;
}

const portfoliosContext = createContext<PortfoliosContextType | undefined>(
  undefined);

type ProvidePortfolioProps = {
  children: React.ReactNode;
};

export function ProvidePortfolios({ children }: ProvidePortfolioProps) {
  const {
    loading,
    error,
    data,
    refetch,
  } = useQuery<myPortfolios>(GET_PORTFOLIOS);
  const [
    createOne,
    createOneResponse,
  ] = useMutation<createOnePortfolio, createOnePortfolioVariables>(
    CREATE_PORTFOLIO);
  const [
    updateOne,
    updateOneResponse,
  ] = useMutation<updateOnePortfolio, updateOnePortfolioVariables>(
    UPDATE_PORTFOLIO);
  const [
    deleteOne,
    deleteOneResponse,
  ] = useMutation<deleteOnePortfolio, deleteOnePortfolioVariables>(
    DELETE_PORTFOLIO);
  const [
    createPublicAsset,
    createPublicAssetResponse,
  ] = useMutation<createOnePublicAsset, createOnePublicAssetVariables>(
    CREATE_PUBLIC_ASSET);
  const [
    createPrivateAsset,
    createPrivateAssetResponse,
  ] = useMutation<createOnePrivateAsset, createOnePrivateAssetVariables>(
    CREATE_PRIVATE_ASSET);
  const [
    deletePrivateAsset,
    deletePrivateAssetResponse,
  ] = useMutation<deleteOnePrivateAsset, deleteOnePrivateAssetVariables>(
    DELETE_PRIVATE_ASSET);
  const [
    deletePublicAsset,
    deletePublicAssetResponse,
  ] = useMutation<deleteOnePublicAsset, deleteOnePublicAssetVariables>(
    DELETE_PUBLIC_ASSET);
  const [
    updatePrivateAsset,
    updatePrivateAssetResponse,
  ] = useMutation<updateOnePrivateAsset, updateOnePrivateAssetVariables>(
    UPDATE_PRIVATE_ASSET);
  // const [
  //   updateOnePublicAsset,
  //   updateOnePublicAssetResponse,
  // ] = useMutation<updateOnePublicAsset, updateOnePublicAssetVariables>(UPDATE_PUBLIC_ASSET);

  // type BaseAssetInput = Pick<AssetCreateWithoutPrivateAssetInput, 'name' | 'description'>;
  // type UpdatePrivateAssetInput = {
  //   baseAsset: Partial<BaseAssetInput>;
  // };

  // const updatePrivateAssetx = (assetId: number, inputData: UpdatePrivateAssetInput) => {
  //   updatePrivateAsset({
  //     variables: {
  //       assetId,
  //       data: {
  //         baseAsset: {
  //           update: {
  //             name: { set: inputData.baseAsset?.name },
  //             description: { set: inputData.baseAsset?.description },
  //           },
  //         },
  //       },
  //     },
  //   });
  // };

  return (
    <portfoliosContext.Provider value={{
      loading,
      error,
      data: data?.myPortfolios ?? null,
      refetch,
      createOne,
      createOneResponse,
      updateOne,
      updateOneResponse,
      deleteOne,
      deleteOneResponse,
      createPublicAsset,
      createPublicAssetResponse,
      createPrivateAsset,
      createPrivateAssetResponse,
      deletePublicAsset,
      deletePublicAssetResponse,
      deletePrivateAsset,
      deletePrivateAssetResponse,
      updatePrivateAsset,
      updatePrivateAssetResponse,
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
