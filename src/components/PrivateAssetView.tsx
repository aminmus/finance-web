import React, { SyntheticEvent, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { myPortfolios_myPortfolios_privateAssets as PrivateAsset } from '../graphql-strings/__generated__/myPortfolios';
import { usePortfolios } from '../contexts/usePortfolios';
import AssetView from './AssetView';

type Props = {
  asset: PrivateAsset | null,
};

function PrivateAssetView({ asset }: Props) {
  const portfoliosCtx = usePortfolios();
  const history = useHistory();
  const match = useRouteMatch();

  if (!asset) return <p>Asset not found</p>;

  const handleDelete = (_event: SyntheticEvent) => {
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

  return (
    <AssetView
      baseAsset={asset.baseAsset}
      title={asset.baseAsset.name}
      handleDelete={handleDelete}
    />
  );
}

export default PrivateAssetView;
