import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  myPortfolios_myPortfolios_privateAssets as PrivateAsset,
} from '../graphql-strings/__generated__/myPortfolios';
import { usePortfolios } from '../contexts/usePortfolios';
import AssetView from './AssetView';

type Props = {
  asset: PrivateAsset | null,
};

const initialEditInput = {
  name: '',
  description: '',
};

function PrivateAssetView({ asset }: Props) {
  const portfoliosCtx = usePortfolios();
  const history = useHistory();
  const match = useRouteMatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editInputData, setEditInputData] = useState(initialEditInput);
  // const [validationError, setValidationError] = useState<string | null>(null);

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

  const updateAsset = (
    assetId: number, data: { name: string, description: string },
  ) => {
    portfoliosCtx?.updatePrivateAsset({ variables: { assetId, ...data } });
  };

  // on update
  // useEffect(() => {
  //   if (
  //     portfoliosCtx?.updatePrivateAssetResponse.called
  //     && !portfoliosCtx?.updatePrivateAssetResponse.loading
  //   ) {
  //     setIsEditing(false);
  //     setEditInputData(initialEditInput);
  //     portfoliosCtx.refetch();
  //   }
  // },
  // [
  //   portfoliosCtx?.updatePrivateAssetResponse.loading,
  //   portfoliosCtx?.updatePrivateAssetResponse.called,
  // ]);

  if (!asset) return <p>Asset not found</p>;

  const handleDelete = (_event: SyntheticEvent) => {
    portfoliosCtx?.deletePrivateAsset({ variables: { assetId: asset.id } });
  };

  // const handleEditSave = (_event: SyntheticEvent) => {
  //   if (!portfoliosCtx) return;
  //
  //   // Validation
  //   const inputKeys = Object.keys(editInputData);
  //
  //   // @ts-ignore
  //   const includesEmptyValues = inputKeys.some((inputKey) => !editInputData[inputKey]);
  //
  //   if (includesEmptyValues) {
  //     setValidationError('Asset cannot contain empty fields');
  //     return;
  //   }
  //
  //   // Update
  //   portfoliosCtx.updatePrivateAsset({ variables: { assetId: asset.id, ...editInputData } });
  //
  //   // Clear validation errors
  //   setValidationError(null);
  // };

  console.log('rerender');
  return (
    <AssetView
      assetId={asset.id}
      baseAsset={asset.baseAsset}
      title={asset.baseAsset.name}
      handleDelete={handleDelete}
      // setIsEditing={setIsEditing}
      updateAsset={updateAsset}
      // handleEditSave={handleEditSave}
      // isEditing={isEditing}
      // editInputData={editInputData}
      // setEditInputData={setEditInputData}
    />
  );
}

export default PrivateAssetView;
