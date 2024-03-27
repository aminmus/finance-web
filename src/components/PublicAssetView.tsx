import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { myPortfolios_myPortfolios_publicAssets as PublicAsset } from '../graphql-strings/__generated__/myPortfolios';
import { usePortfolios } from '../contexts/usePortfolios';
import AssetView from './AssetView';

type Props = {
  asset: PublicAsset | null,
};

const initialEditInput = { name: '', description: '' };

function PublicAssetView({ asset }: Props) {
  const portfoliosCtx = usePortfolios();
  const history = useHistory();
  const match = useRouteMatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editInputData, setEditInputData] = useState(initialEditInput);
  const [validationError, setValidationError] = useState<string | null>(null);

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

  const handleEditSave = (_event: SyntheticEvent) => {
    if (!portfoliosCtx) return;

    // Validation
    const inputKeys = Object.keys(editInputData);

    // @ts-ignore
    const includesEmptyValues = inputKeys.some((inputKey) => !editInputData[inputKey]);

    if (includesEmptyValues) {
      setValidationError('Asset cannot contain empty fields');
      return;
    }

    // Update
    portfoliosCtx.updatePrivateAsset({ variables: { assetId: asset.id, ...editInputData } });

    // Clear validation errors
    setValidationError(null);
  };

  return (
    <AssetView
      baseAsset={asset.baseAsset}
      title={`${asset.baseAsset.name} (${asset.symbol})`}
      subHeader={asset.market}
      handleDelete={handleDelete}
      setIsEditing={setIsEditing}
      handleEditSave={handleEditSave}
      isEditing={isEditing}
      editInputData={editInputData}
      setEditInputData={setEditInputData}
    />
  );
}

export default PublicAssetView;
