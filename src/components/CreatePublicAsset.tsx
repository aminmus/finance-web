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

export default function CreatePublicAsset({ portfolioId }: Props) {
  const portfolioCtx = usePortfolios();
  const history = useHistory();

  const [assetInput, setAssetInput] = useState({
    name: '',
    description: '',
    market: '',
    symbol: '',
  });

  useEffect(() => {
    if (
      !portfolioCtx?.createPublicAssetResponse.loading
      && portfolioCtx?.createPublicAssetResponse.data
    ) {
      console.log(portfolioCtx?.createPublicAssetResponse.data);

      history.push(`/portfolios/${portfolioId}/assets`);
    }
  }, [
    portfolioCtx?.createPublicAssetResponse.data,
    portfolioCtx?.createPublicAssetResponse.loading,
  ]);

  const createPublicAsset = (event: SyntheticEvent) => {
    event.preventDefault();

    const {
      name,
      description,
      market,
      symbol,
    } = assetInput;

    if (!name || !description || !market || !symbol) return;

    portfolioCtx?.createPublicAsset({
      variables: {
        data: {
          market,
          symbol,
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
      <form onSubmit={createPublicAsset}>
        <FormGroup>
          <TextField label="Name" name="name" value={assetInput?.name} onChange={handleAssetInputChange} />
          <TextField label="Description" name="description" value={assetInput?.description} onChange={handleAssetInputChange} />
          <TextField label="Market" name="market" value={assetInput?.market} onChange={handleAssetInputChange} />
          <TextField label="Symbol" name="symbol" value={assetInput?.symbol} onChange={handleAssetInputChange} />
        </FormGroup>
        <Button type="submit">Create</Button>
      </form>
    </Card>
  );
}
