import React, { SyntheticEvent, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { myPortfolios_myPortfolios_publicAssets as PublicAsset } from '../graphql-strings/__generated__/myPortfolios';
import { usePortfolios } from '../contexts/usePortfolios';
import AssetView from './AssetView';

type Props = {
  asset: PublicAsset | null,
};

function PublicAssetView({ asset }: Props) {
  const portfoliosCtx = usePortfolios();
  const history = useHistory();
  const match = useRouteMatch();

  if (!asset) return <p>Asset not found</p>;

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

  const handleDelete = (_event: SyntheticEvent) => {
    portfoliosCtx?.deletePublicAsset({ variables: { assetId: asset.id } });
  };

  return (
    <AssetView
      baseAsset={asset.baseAsset}
      title={`${asset.baseAsset.name} (${asset.symbol})`}
      subHeader={asset.market}
      handleDelete={handleDelete}
    />
  );
}

export default PublicAssetView;
