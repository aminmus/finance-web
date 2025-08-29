import {
  Button, Card, FormGroup, TextField,
} from '@mui/material';
import React, {
  ChangeEvent, SyntheticEvent, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { usePortfolios } from '../contexts/usePortfolios';

type Props = {
  portfolioId: number;
};

export default function CreatePrivateAsset({ portfolioId }: Props) {
  const portfolioCtx = usePortfolios();
  const history = useHistory();
  const [assetInput, setAssetInput] = useState({ name: '', description: '' });

  useEffect(() => {
    if (
      !portfolioCtx?.createPrivateAssetResponse.loading
      && portfolioCtx?.createPrivateAssetResponse.data
    ) {
      console.log(portfolioCtx?.createPrivateAssetResponse.data);

      history.push(`/portfolios/${portfolioId}/assets`);
    }
  }, [
    portfolioCtx?.createPrivateAssetResponse.data,
    portfolioCtx?.createPrivateAssetResponse.loading,
  ]);

  const createPrivateAsset = (event: SyntheticEvent) => {
    event.preventDefault();

    const { name, description } = assetInput;

    if (!name || !description) return;

    portfolioCtx?.createPrivateAsset({
      variables: {
        data: {
          baseAsset: {
            create: {
              portfolio: {
                connect: {
                  id: portfolioId,
                },
              },
              name,
              description,
            },
          },
        },
      },
    });
  };

  const handleAssetInputChange = (event: ChangeEvent<HTMLInputElement>) => (
    setAssetInput((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
  );

  return (
    <Card>
      <form onSubmit={createPrivateAsset}>
        <FormGroup>
          <TextField label="Name" name="name" value={assetInput?.name} onChange={handleAssetInputChange} />
          <TextField label="Description" name="description" value={assetInput?.description} onChange={handleAssetInputChange} />
        </FormGroup>
        <Button type="submit">Create</Button>
      </form>
    </Card>
  );
}
