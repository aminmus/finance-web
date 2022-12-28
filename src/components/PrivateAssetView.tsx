import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { myPortfolios_myPortfolios_privateAssets as PrivateAsset } from '../graphql-strings/__generated__/myPortfolios';

type Props = {
  asset: PrivateAsset | null,
};

function PrivateAssetView({ asset }: Props) {
  if (!asset) return <p>Asset not found</p>;

  const {
    // id,
    // historicalValues,
    baseAsset: {
      createdAt,
      description,
      name,
      portfolioId,
      quantity,
      updatedAt,
    },
  } = asset;

  return (
    <Card>
      <CardHeader title={name} />
      <CardContent>
        description:
        {' '}
        <p>{description}</p>
        portfolioId:
        {' '}
        <p>{portfolioId}</p>
        quantity:
        <p>{quantity}</p>
        {' '}
        createdAt:
        <p>{createdAt}</p>
        {' '}
        updatedAt:
        {' '}
        <p>{updatedAt}</p>
      </CardContent>
    </Card>
  );
}

export default PrivateAssetView;
