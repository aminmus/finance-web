import React, { ChangeEvent, SyntheticEvent } from 'react';
import {
  Button, Card, CardActions, CardContent, CardHeader, TextField,
} from '@material-ui/core';
import { myPortfolios_myPortfolios_privateAssets as PrivateAsset } from '../graphql-strings/__generated__/myPortfolios';

type Props = {
  baseAsset: PrivateAsset['baseAsset'] | null;
  title: string;
  subHeader?: string | null;
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
  handleEditSave?: React.MouseEventHandler<HTMLButtonElement>;
  setIsEditing?: Function;
  isEditing?: boolean;
  editInputData?: { name?: string, description?: string };
  setEditInputData: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
  }>>;
};

function AssetView({
  baseAsset,
  handleDelete,
  title,
  subHeader = null,
  handleEditSave,
  setIsEditing,
  isEditing,
  editInputData,
  setEditInputData,
}: Props) {
  if (!baseAsset) return <p>Asset not found</p>;

  const {
    createdAt,
    description,
    portfolioId,
    quantity,
    updatedAt,
  } = baseAsset;

  const handleEdit = (_event: SyntheticEvent) => {
    if (setIsEditing) setIsEditing(true);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => (
    setEditInputData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
  );

  const handleEditCancel = (_event: SyntheticEvent) => {
    if (setIsEditing) setIsEditing(false);
  };

  const Header = () => (isEditing ? (
    <TextField
      label="Name"
      name="name"
      value={editInputData?.name}
      onChange={handleInputChange}
    />
  )
    : (<CardHeader title={title} subheader={subHeader} />));

  const Content = () => (
    <CardContent>
      {isEditing ? (
        <TextField
          label="Description"
          name="description"
          value={editInputData?.description}
          onChange={handleInputChange}
        />
      ) : (<p>{description}</p>)}
      {' '}
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
  );

  const Actions = () => (
    <CardActions>
      {isEditing ? (
        <>
          <Button onClick={handleEditSave} type="button">Save changes</Button>
          <Button onClick={handleEditCancel} type="button">Cancel changes</Button>
        </>
      )
        : (
          <>
            <Button onClick={handleDelete} type="button">Delete asset</Button>
            <Button onClick={handleEdit} type="button">Edit asset</Button>
          </>
        )}
    </CardActions>
  );

  return (
    <Card>
      <Header />
      <Content />
      <Actions />
    </Card>
  );
}

export default AssetView;
