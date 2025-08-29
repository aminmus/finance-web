import React from 'react';
import {
  Button, Card, CardActions, CardContent, CardHeader,
} from '@material-ui/core';
import { myPortfolios_myPortfolios_privateAssets as PrivateAsset } from '../graphql-strings/__generated__/myPortfolios';

type Props = {
  baseAsset: PrivateAsset['baseAsset'] | null,
  title: string,
  handleDelete: React.MouseEventHandler<HTMLButtonElement>,
  subHeader?: string | null,
  handleEdit?: React.MouseEventHandler<HTMLButtonElement>,
};

function AssetView({
  baseAsset, handleDelete, title, subHeader = null, handleEdit,
}: Props) {
  if (!baseAsset) return <p>Asset not found</p>;

  const {
    createdAt,
    description,
    portfolioId,
    quantity,
    updatedAt,
  } = baseAsset;

  return (
    <Card>
      <CardHeader title={title} subheader={subHeader} />
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
        {handleEdit && <Button onClick={handleEdit} type="button">Edit</Button>}
        <Button onClick={handleDelete} type="button">Delete</Button>
      </CardActions>
    </Card>
  );
}

export default AssetView;
