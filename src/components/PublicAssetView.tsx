import React, { SyntheticEvent, useEffect } from 'react';
import {
  Button, Card, CardActions, CardContent, CardHeader,
} from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { myPortfolios_myPortfolios_publicAssets as PublicAsset } from '../graphql-strings/__generated__/myPortfolios';
import { usePortfolios } from '../contexts/usePortfolios';

type Props = {
  asset: PublicAsset | null,
};

function PublicAssetView({ asset }: Props) {
  const portfoliosCtx = usePortfolios();
  const history = useHistory();
  const match = useRouteMatch();

  if (!asset) return <p>Asset not found</p>;

  const {
    // id,
    market,
    symbol,
    baseAsset: {
      createdAt,
      description,
      name,
      portfolioId,
      quantity,
      updatedAt,
    },
  } = asset;

  useEffect(() => {
    if (
      portfoliosCtx?.deletePublicAssetResponse.called
      && !portfoliosCtx?.deletePublicAssetResponse.loading
    ) {
      // @ts-ignore
      history.push(`/portfolios/${match.params.portfolioId}/assets`);
    }
  },
  [
    portfoliosCtx?.deletePublicAssetResponse.loading,
    portfoliosCtx?.deletePublicAssetResponse.called,
  ]);

  const handleDelete = (event: SyntheticEvent) => {
    portfoliosCtx?.deletePublicAsset({ variables: { assetId: asset.id } });
  };

  return (
    <Card>
      <CardHeader title={`${name} (${symbol})`} subheader={market} />
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

export default PublicAssetView;
