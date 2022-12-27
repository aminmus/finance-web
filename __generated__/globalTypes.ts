/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum TransactionType {
  buy = "buy",
  sell = "sell",
}

export interface AssetCreateNestedOneWithoutPublicAssetInput {
  create?: AssetCreateWithoutPublicAssetInput | null;
  connectOrCreate?: AssetCreateOrConnectWithoutPublicAssetInput | null;
  connect?: AssetWhereUniqueInput | null;
}

export interface AssetCreateOrConnectWithoutPublicAssetInput {
  where: AssetWhereUniqueInput;
  create: AssetCreateWithoutPublicAssetInput;
}

export interface AssetCreateWithoutPublicAssetInput {
  updatedAt?: any | null;
  createdAt?: any | null;
  name: string;
  description?: string | null;
  quantity?: number | null;
  portfolio: PortfolioCreateNestedOneWithoutAssetsInput;
  transactions?: TransactionRecordCreateNestedManyWithoutAssetInput | null;
  privateAsset?: PrivateAssetCreateNestedOneWithoutBaseAssetInput | null;
}

export interface AssetWhereUniqueInput {
  id?: number | null;
}

export interface HistoricalValueCreateNestedManyWithoutAssetInput {
  create?: HistoricalValueCreateWithoutAssetInput[] | null;
  connectOrCreate?: HistoricalValueCreateOrConnectWithoutAssetInput[] | null;
  connect?: HistoricalValueWhereUniqueInput[] | null;
}

export interface HistoricalValueCreateOrConnectWithoutAssetInput {
  where: HistoricalValueWhereUniqueInput;
  create: HistoricalValueCreateWithoutAssetInput;
}

export interface HistoricalValueCreateWithoutAssetInput {
  updatedAt?: any | null;
  createdAt?: any | null;
  date?: any | null;
  unitPrice: number;
  currency: string;
  description?: string | null;
}

export interface HistoricalValueWhereUniqueInput {
  id?: number | null;
}

export interface PortfolioCreateNestedOneWithoutAssetsInput {
  create?: PortfolioCreateWithoutAssetsInput | null;
  connectOrCreate?: PortfolioCreateOrConnectWithoutAssetsInput | null;
  connect?: PortfolioWhereUniqueInput | null;
}

export interface PortfolioCreateOrConnectWithoutAssetsInput {
  where: PortfolioWhereUniqueInput;
  create: PortfolioCreateWithoutAssetsInput;
}

export interface PortfolioCreateWithoutAssetsInput {
  updatedAt?: any | null;
  createdAt?: any | null;
  name: string;
  description?: string | null;
  owner: UserCreateNestedOneWithoutPortfoliosInput;
}

export interface PortfolioWhereUniqueInput {
  id?: number | null;
}

export interface PrivateAssetCreateNestedOneWithoutBaseAssetInput {
  create?: PrivateAssetCreateWithoutBaseAssetInput | null;
  connectOrCreate?: PrivateAssetCreateOrConnectWithoutBaseAssetInput | null;
  connect?: PrivateAssetWhereUniqueInput | null;
}

export interface PrivateAssetCreateOrConnectWithoutBaseAssetInput {
  where: PrivateAssetWhereUniqueInput;
  create: PrivateAssetCreateWithoutBaseAssetInput;
}

export interface PrivateAssetCreateWithoutBaseAssetInput {
  historicalValues?: HistoricalValueCreateNestedManyWithoutAssetInput | null;
}

export interface PrivateAssetWhereUniqueInput {
  id?: number | null;
}

export interface PublicAssetCreateInput {
  symbol?: string | null;
  market?: string | null;
  baseAsset: AssetCreateNestedOneWithoutPublicAssetInput;
}

export interface TransactionRecordCreateNestedManyWithoutAssetInput {
  create?: TransactionRecordCreateWithoutAssetInput[] | null;
  connectOrCreate?: TransactionRecordCreateOrConnectWithoutAssetInput[] | null;
  connect?: TransactionRecordWhereUniqueInput[] | null;
}

export interface TransactionRecordCreateOrConnectWithoutAssetInput {
  where: TransactionRecordWhereUniqueInput;
  create: TransactionRecordCreateWithoutAssetInput;
}

export interface TransactionRecordCreateWithoutAssetInput {
  updatedAt?: any | null;
  createdAt?: any | null;
  date?: any | null;
  note?: string | null;
  currency: string;
  unitPrice: number;
  assetQuantity: number;
  transactionType: TransactionType;
}

export interface TransactionRecordWhereUniqueInput {
  id?: number | null;
}

export interface UserCreateNestedOneWithoutPortfoliosInput {
  create?: UserCreateWithoutPortfoliosInput | null;
  connectOrCreate?: UserCreateOrConnectWithoutPortfoliosInput | null;
  connect?: UserWhereUniqueInput | null;
}

export interface UserCreateOrConnectWithoutPortfoliosInput {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutPortfoliosInput;
}

export interface UserCreateWithoutPortfoliosInput {
  updatedAt?: any | null;
  createdAt?: any | null;
  name: string;
  email: string;
  password: string;
}

export interface UserWhereUniqueInput {
  id?: number | null;
  email?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
