// @ts-nocheck
import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import {
  Button, Card, CardActions, CardContent, CardHeader, TextField,
} from '@material-ui/core';
import {
  myPortfolios_myPortfolios_privateAssets as PrivateAsset,
} from '../graphql-strings/__generated__/myPortfolios';

/* eslint-disable react/prop-types */

type Props = {
  assetId: number;
  baseAsset: PrivateAsset['baseAsset'] | null;
  title: string;
  subHeader?: string | null;
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
  updateAsset?: Function;
  // handleEditSave?: React.MouseEventHandler<HTMLButtonElement>;
  // setIsEditing?: Function;
  // isEditing?: boolean;
  // editInputData?: { name?: string, description?: string };
  // setEditInputData: React.Dispatch<React.SetStateAction<{
  //   name: string;
  //   description: string;
  // }>>;
};

const Header = ({
  isEditing,
  editInputData,
  handleInputChange,
  title,
  subHeader,
}) => (isEditing ? (
  <TextField
    label="Name"
    name="name"
    value={editInputData?.name}
    onChange={handleInputChange}
  />
)
  : (<CardHeader title={title} subheader={subHeader} />));

const Content = ({
  isEditing,
  editInputData,
  handleInputChange,
  asset,
}) => (
  <CardContent>
    {isEditing ? (
      <TextField
        label="Description"
        name="description"
        value={editInputData?.description}
        onChange={handleInputChange}
      />
    ) : (<p>{asset.description}</p>)}
    {' '}
    portfolioId:
    {' '}
    <p>{asset.portfolioId}</p>
    quantity:
    <p>{asset.quantity}</p>
    {' '}
    createdAt:
    <p>{asset.createdAt}</p>
    {' '}
    updatedAt:
    {' '}
    <p>{asset.updatedAt}</p>
  </CardContent>
);

const Actions = ({
  isEditing,
  editInputData,
  handleEditCancel,
  handleDelete,
  handleEdit,
  updateAsset,
  asset,
}) => (
  <CardActions>
    {isEditing ? (
      <>
        <Button
          onClick={() => updateAsset
              && updateAsset(asset.id, {
                ...asset,
                ...editInputData,
              })}
          type="button"
        >
          Save changes
        </Button>
        <Button onClick={handleEditCancel} type="button">
          Cancel
          changes
        </Button>
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

function AssetView({
  assetId,
  baseAsset,
  handleDelete,
  title,
  subHeader = null,
  updateAsset,
  // handleEditSave,
  // setIsEditing,
  // isEditing,
  // editInputData,
  // setEditInputData,
}: Props) {
  if (!baseAsset) return <p>Asset not found</p>;

  const [isEditing, setIsEditing] = useState(false);
  const [editInputData, setEditInputData] = useState({
    name: '',
    description: '',
  });

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
    setEditInputData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  );

  const handleEditCancel = (_event: SyntheticEvent) => {
    if (setIsEditing) setIsEditing(false);
  };

  console.log('rerender the child asset view');
  return (
    <Card>
      <Header
        handleInputChange={handleInputChange}
        editInputData={editInputData}
        isEditing={isEditing}
        subHeader={subHeader}
        title={title}
      />
      <Content
        asset={{
          baseAsset,
          id: assetId,
        }}
        isEditing={isEditing}
        editInputData={editInputData}
        handleInputChange={handleInputChange}
      />
      <Actions
        asset={{
          baseAsset,
          id: assetId,
        }}
        isEditing={isEditing}
        editInputData={editInputData}
        updateAsset={updateAsset}
        handleEditCancel={handleEditCancel}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Card>
  );
}

export default AssetView;
