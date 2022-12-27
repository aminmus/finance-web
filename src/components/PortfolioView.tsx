import { Button, ButtonGroup } from '@material-ui/core';
import React, { SyntheticEvent, useEffect } from 'react';
import {
  Route, Switch, useHistory, useParams, useRouteMatch,
} from 'react-router-dom';
import { usePortfolios } from '../contexts/usePortfolios';
import { myPortfolios_myPortfolios_privateAssets, myPortfolios_myPortfolios_publicAssets } from '../graphql-strings/__generated__/myPortfolios';
import CreatePrivateAsset from './CreatePrivateAsset';
import CreatePublicAsset from './CreatePublicAsset';

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

function PortfolioView() {
  const { portfolioId } = useParams() as { portfolioId: string };
  const portfoliosCtx = usePortfolios();
  const history = useHistory();
  const match = useRouteMatch();

  const currentPortfolio = portfoliosCtx?.data && portfoliosCtx?.data
    .filter(Boolean)
    .find((portfolio) => portfolio?.id.toString() === portfolioId);

  if (!currentPortfolio && portfoliosCtx?.loading) {
    return <p>Loading portfolio...</p>;
  }
  if (!currentPortfolio && !portfoliosCtx?.loading) {
    return <p>Portfolio not found</p>;
  }

  const handleDeletePortfolio = (_event: SyntheticEvent) => {
    if (!currentPortfolio) return;

    console.log({ variables: { portfolioId: currentPortfolio.id } });

    portfoliosCtx?.deleteOne({ variables: { portfolioId: currentPortfolio.id } });
  };

  useEffect(() => {
    if (portfoliosCtx?.deleteOneResponse.called && !portfoliosCtx?.deleteOneResponse.loading) {
      history.push('/portfolios');
    }
  },
  [portfoliosCtx?.deleteOneResponse.loading, portfoliosCtx?.deleteOneResponse.called]);

  if (portfoliosCtx?.deleteOneResponse.called && portfoliosCtx?.deleteOneResponse.loading) {
    return <p>Deleting Portfolio...</p>;
  }

  return currentPortfolio ? (
    <Switch>
      <Route path={`${match.path}/assets/public/create`}>
        <CreatePublicAsset portfolioId={currentPortfolio.id} />
      </Route>
      <Route path={`${match.path}/assets/private/create`}>
        <CreatePrivateAsset portfolioId={currentPortfolio.id} />
      </Route>
      <Route path={`${match.path}/`}>
        <div>
          <ButtonGroup>
            <Button href={`${match.url}/assets/public/create`} type="button">
              Add Public Asset
            </Button>
            <Button href={`${match.url}/assets/private/create`} type="button">
              Add Private Asset
            </Button>
            <Button type="button" onClick={handleDeletePortfolio}>Delete Portfolio</Button>
          </ButtonGroup>
          <div id="portfolio-info">
            <h1>
              {currentPortfolio?.name}
            </h1>
            <p>
              <div id="portfolio-description">
                <span>Description: </span>
                <span>{currentPortfolio?.description}</span>
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
                  privateAsset && <PrivateAssetItem privateAsset={privateAsset} />
                ))}
            </ul>
            <h2>Public Assets</h2>
            <ul id="public-assets">
              {currentPortfolio.publicAssets && currentPortfolio.publicAssets.map((publicAsset) => (
                publicAsset && <PublicAssetItem publicAsset={publicAsset} />
              ))}
            </ul>
          </div>
        </div>
      </Route>
    </Switch>
  ) : (
    <div />
  );
}

export default PortfolioView;
