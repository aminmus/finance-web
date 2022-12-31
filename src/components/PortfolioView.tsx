import React, {
  ChangeEvent, SyntheticEvent, useEffect, useState,
} from 'react';
import {
  Button, ButtonGroup, TextField,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {
  Link,
  Route, Switch, useHistory, useParams, useRouteMatch,
} from 'react-router-dom';
import { usePortfolios } from '../contexts/usePortfolios';
import { myPortfolios_myPortfolios_privateAssets, myPortfolios_myPortfolios_publicAssets } from '../graphql-strings/__generated__/myPortfolios';
import CreatePrivateAsset from './CreatePrivateAsset';
import CreatePublicAsset from './CreatePublicAsset';
import PublicAssetView from './PublicAssetView';
import PrivateAssetView from './PrivateAssetView';

function PrivateAssetItem(
  { privateAsset: { baseAsset } }: { privateAsset: myPortfolios_myPortfolios_privateAssets },
) {
  return (
    <li>
      <p>{baseAsset.name}</p>
      <p>
        <span>Quantity: </span>
        <span>{baseAsset.quantity}</span>
      </p>
    </li>
  );
}

function PublicAssetItem(
  {
    publicAsset: {
      baseAsset,
      symbol,
      market,
    },
  }: { publicAsset: myPortfolios_myPortfolios_publicAssets },
) {
  return (
    <li>
      <p>{baseAsset.name}</p>
      <p>
        <span>Symbol: </span>
        <span>{symbol}</span>
      </p>
      <p>
        <span>Market: </span>
        <span>{market}</span>
      </p>
      <p>
        <span>Quantity: </span>
        <span>{baseAsset.quantity}</span>
      </p>
    </li>
  );
}

const EDITABLE_PORTFOLIO_FIELDS = ['name', 'description'] as const;
const initialPortfolioInput = { name: '', description: '' };

function PortfolioView() {
  const { portfolioId } = useParams() as { portfolioId: string };
  const portfoliosCtx = usePortfolios();
  const history = useHistory();
  const match = useRouteMatch();

  const [isEditing, setIsEditing] = useState(false);
  const [portfolioInput, setPortfolioInput] = useState(initialPortfolioInput);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (portfoliosCtx?.deleteOneResponse.called && !portfoliosCtx?.deleteOneResponse.loading) {
      history.push('/portfolios');
    }
  },
  [portfoliosCtx?.deleteOneResponse.loading, portfoliosCtx?.deleteOneResponse.called]);

  useEffect(() => {
    if (portfoliosCtx?.updateOneResponse.called && !portfoliosCtx?.updateOneResponse.loading) {
      setIsEditing(false);
      setPortfolioInput(initialPortfolioInput);
      portfoliosCtx.refetch();
    }
  },
  [portfoliosCtx?.updateOneResponse.loading, portfoliosCtx?.updateOneResponse.called]);

  const currentPortfolio = portfoliosCtx?.data && portfoliosCtx?.data
    .filter(Boolean)
    .find((portfolio) => portfolio?.id.toString() === portfolioId);

  if (!currentPortfolio && portfoliosCtx?.loading) {
    return <p>Loading portfolio...</p>;
  }
  if (!currentPortfolio && !portfoliosCtx?.loading) {
    return <p>Portfolio not found</p>;
  }
  if (!currentPortfolio) {
    return <div />;
  }

  const handlePortfolioInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (['name', 'description'].includes(event.target.name)) {
      setPortfolioInput((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
    }
  };

  const handleCancelEditPortfolio = (_event: SyntheticEvent) => {
    setIsEditing(false);
    setValidationError('');
    setPortfolioInput(initialPortfolioInput);
  };

  const handleSubmitEditPortfolio = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!portfoliosCtx) return;

    const inputKeys = Object.keys(portfolioInput);

    // @ts-ignore
    const includesEmptyValues = inputKeys.some((inputKey) => !portfolioInput[inputKey]);

    if (includesEmptyValues) {
      setValidationError('Portfolio cannot contain empty fields');
      return;
    }

    const updateData = inputKeys
      // @ts-ignore
      .filter((inputKey) => EDITABLE_PORTFOLIO_FIELDS.includes(inputKey))
      // @ts-ignore
      .filter(
        (inputKey) => (
          // @ts-ignore
          portfolioInput[inputKey] !== currentPortfolio[inputKey]),
      ).reduce((dataObj, inputKey) => ({
        ...dataObj,
        // @ts-ignore
        [inputKey]: portfolioInput[inputKey],
      }), {});

    portfoliosCtx.updateOne({ variables: { ...updateData, portfolioId: currentPortfolio.id } });
    setValidationError('');
  };

  const handleEditPortfolio = (_event: SyntheticEvent) => setIsEditing(true);

  const handleDeletePortfolio = (_event: SyntheticEvent) => {
    if (!currentPortfolio) return;

    portfoliosCtx?.deleteOne({ variables: { portfolioId: currentPortfolio.id } });
  };

  if (portfoliosCtx?.deleteOneResponse.called && portfoliosCtx?.deleteOneResponse.loading) {
    return <p>Deleting Portfolio...</p>;
  }

  const getPublicAssetById = (assetId: string) => (
    (currentPortfolio?.publicAssets
      && currentPortfolio?.publicAssets.find((asset) => asset?.id === parseInt(assetId, 10))
    ) || null);

  const getPrivateAssetById = (assetId: string) => (
    (currentPortfolio?.privateAssets
      && currentPortfolio?.privateAssets.find((asset) => asset?.id === parseInt(assetId, 10))
    ) || null);

  return (
    <Switch>
      <Route path={`${match.path}/assets/public/create`}>
        <CreatePublicAsset portfolioId={currentPortfolio.id} />
      </Route>
      <Route path={`${match.path}/assets/private/create`}>
        <CreatePrivateAsset portfolioId={currentPortfolio.id} />
      </Route>
      <Route
        path={`${match.path}/assets/public/:assetId`}
        render={({ match: { params: { assetId } } }) => (
          <PublicAssetView asset={getPublicAssetById(assetId)} />
        )}
      />
      <Route
        path={`${match.path}/assets/private/:assetId`}
        render={({ match: { params: { assetId } } }) => (
          <PrivateAssetView asset={getPrivateAssetById(assetId)} />
        )}
      />
      <Route path={`${match.path}/`}>
        <div>
          {validationError && (<MuiAlert severity="error">{validationError}</MuiAlert>)}
          <ButtonGroup>
            {
              isEditing ? (
                <>
                  <Button type="submit" onClick={handleSubmitEditPortfolio}>Confirm edit</Button>
                  <Button type="submit" onClick={handleCancelEditPortfolio}>Cancel edit</Button>
                </>
              ) : (
                <>
                  <Button href={`${match.url}/assets/public/create`} type="button">
                    Add Public Asset
                  </Button>
                  <Button href={`${match.url}/assets/private/create`} type="button">
                    Add Private Asset
                  </Button>
                  <Button type="button" onClick={handleDeletePortfolio}>Delete Portfolio</Button>
                  <Button type="button" onClick={handleEditPortfolio}>Edit Portfolio</Button>
                </>
              )
            }
          </ButtonGroup>
          <div id="portfolio-info">
            {isEditing ? (
              <TextField
                label="Name"
                name="name"
                defaultValue={currentPortfolio?.name}
                value={portfolioInput?.name}
                onChange={handlePortfolioInputChange}
              />
            ) : (
              <h1>
                {currentPortfolio?.name}
              </h1>
            )}

            <p>
              <div id="portfolio-description">
                {isEditing ? (
                  <TextField
                    label="Description"
                    name="description"
                    defaultValue={currentPortfolio?.description}
                    value={portfolioInput?.description}
                    onChange={handlePortfolioInputChange}
                  />
                ) : (
                  <>
                    <span>Description: </span>
                    <span>{currentPortfolio?.description}</span>
                  </>
                )}
              </div>
              <div id="portfolio-asset-quantity">
                <span>Unique assets: </span>
                <span>{currentPortfolio?.assetQuantity}</span>
              </div>
            </p>
          </div>
          <div id="portfolio-assets">
            <h2>Private Assets</h2>
            <ul id="private-assets">
              {currentPortfolio.privateAssets
                && currentPortfolio.privateAssets.map((privateAsset) => (
                  privateAsset
                  && (
                    <Link to={`${match.url}/assets/private/${privateAsset.id}`}>
                      <PrivateAssetItem privateAsset={privateAsset} />
                    </Link>
                  )
                ))}
            </ul>
            <h2>Public Assets</h2>
            <ul id="public-assets">
              {currentPortfolio.publicAssets && currentPortfolio.publicAssets.map((publicAsset) => (
                publicAsset && (
                  <Link to={`${match.url}/assets/public/${publicAsset.id}`}>
                    <PublicAssetItem publicAsset={publicAsset} />
                  </Link>
                )
              ))}
            </ul>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

export default PortfolioView;
