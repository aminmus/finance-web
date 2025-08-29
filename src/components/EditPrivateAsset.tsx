import { Button, Card, FormGroup, TextField } from '@material-ui/core';
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { usePortfolios } from '../contexts/usePortfolios';
import { myPortfolios_myPortfolios_privateAssets as PrivateAsset } from '../graphql-strings/__generated__/myPortfolios';

type Props = {
  asset: PrivateAsset | null,
};

export default function EditPrivateAsset({ asset }: Props) {
  const portfolioCtx = usePortfolios();
  const history = useHistory();
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const [assetInput, setAssetInput] = useState({
    name: asset?.baseAsset.name ?? '',
    description: asset?.baseAsset.description ?? '',
  });

  useEffect(() => {
    if (
      portfolioCtx?.updatePrivateAssetResponse.called
      && !portfolioCtx?.updatePrivateAssetResponse.loading
    ) {
      portfolioCtx?.refetch();
      if (asset) {
        history.push(`/portfolios/${portfolioId}/assets/private/${asset.id}`);
      }
    }
  }, [
    portfolioCtx?.updatePrivateAssetResponse.called,
    portfolioCtx?.updatePrivateAssetResponse.loading,
  ]);

  if (!asset) return <p>Asset not found</p>;

  const handleAssetInputChange = (event: ChangeEvent<HTMLInputElement>) => (
    setAssetInput((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
  );

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    portfolioCtx?.updatePrivateAsset({
      variables: {
        assetId: asset.id,
        name: assetInput.name,
        description: assetInput.description,
      },
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField label="Name" name="name" value={assetInput.name} onChange={handleAssetInputChange} />
          <TextField label="Description" name="description" value={assetInput.description} onChange={handleAssetInputChange} />
        </FormGroup>
        <Button type="submit">Save</Button>
      </form>
    </Card>
  );
}
