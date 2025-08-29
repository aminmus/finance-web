import {
  Button, Card, FormGroup, TextField,
} from '@mui/material';
import React, {
  ChangeEvent, SyntheticEvent, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { usePortfolios } from '../contexts/usePortfolios';

export default function CreatePortfolio() {
  const portfolioCtx = usePortfolios();
  const auth = useAuth();
  const history = useHistory();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (!portfolioCtx?.createOneResponse.loading && portfolioCtx?.createOneResponse.data) {
      console.log(portfolioCtx?.createOneResponse.data);
      // TODO: Add new portfolio to context data
      history.push(`/portfolios/${portfolioCtx.createOneResponse.data.createOnePortfolio.id}`);
    }
  }, [portfolioCtx?.createOneResponse.data, portfolioCtx?.createOneResponse.loading]);

  function createPortfolio(event: SyntheticEvent) {
    event.preventDefault();
    if (!auth?.user?.id) return;
    portfolioCtx?.createOne({ variables: { userId: auth?.user?.id, name, description } });
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  return (
    <Card>
      <form onSubmit={createPortfolio}>
        <FormGroup>
          <TextField label="Name" value={name} onChange={handleNameChange} />
          <TextField label="Description" value={description} onChange={handleDescriptionChange} />
        </FormGroup>
        <Button type="submit">Create</Button>
      </form>
    </Card>
  );
}
