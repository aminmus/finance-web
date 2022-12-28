import React, { SyntheticEvent, useEffect } from 'react';
import {
  Button, Card, CardActions, CardContent, CardHeader,
} from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { myPortfolios_myPortfolios_privateAssets as PrivateAsset } from '../graphql-strings/__generated__/myPortfolios';
import { usePortfolios } from '../contexts/usePortfolios';

type Props = {
  asset: PrivateAsset | null,
};

function PrivateAssetView({ asset }: Props) {
  const portfoliosCtx = usePortfolios();
  const history = useHistory();
  const match = useRouteMatch();

  if (!asset) return <p>Asset not found</p>;

  const handleDelete = (event: SyntheticEvent) => {
    portfoliosCtx?.deletePrivateAsset({ variables: { assetId: asset.id } });
  };

  useEffect(() => {
    if (
      portfoliosCtx?.deletePrivateAssetResponse.called
      && !portfoliosCtx?.deletePrivateAssetResponse.loading
    ) {
      // @ts-ignore
      history.push(`/portfolios/${match.params.portfolioId}/assets`);
    }
  },
  [
    portfoliosCtx?.deletePrivateAssetResponse.loading,
    portfoliosCtx?.deletePrivateAssetResponse.called,
  ]);

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

      <CardActions>
        <Button onClick={handleDelete} type="button">Delete</Button>
      </CardActions>
    </Card>
  );
}

export default PrivateAssetView;
