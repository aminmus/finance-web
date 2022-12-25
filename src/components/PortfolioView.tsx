import React from 'react';
import { useParams } from 'react-router-dom';
import { usePortfolios } from '../usePortfolios';
import { myPortfolios_myPortfolios_privateAssets, myPortfolios_myPortfolios_publicAssets } from '../__generated__/myPortfolios';

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

  const currentPortfolio = portfoliosCtx?.data && portfoliosCtx.data.find(
    (portfolio) => portfolio.id.toString() === portfolioId,
  );

  if (!currentPortfolio && portfoliosCtx?.loading) {
    return <p>Loading portfolio...</p>;
  }
  if (!currentPortfolio && !portfoliosCtx?.loading) {
    return <p>Portfolio not found</p>;
  }

  return currentPortfolio ? (
    <div>
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
          {currentPortfolio.privateAssets && currentPortfolio.privateAssets.map((privateAsset) => (
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
  ) : (<div />);
}

export default PortfolioView;
