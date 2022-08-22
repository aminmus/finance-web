import React from 'react';
import { useParams } from 'react-router-dom';
import { usePortfolios } from '../usePortfolios';
import { myPortfolios_myPortfolios } from '../__generated__/myPortfolios';

function PortfolioView() {
  /*
    TODO:
    1. General portfolio information
    2. List public and private assets
    3. Show total portfolio worth
  */

  const { portfolioId } = useParams() as { portfolioId: string };
  const { data, loading, error } = usePortfolios();

  const currentPortfolio = data && data.find(
    (portfolio) => portfolio.id.toString() === portfolioId,
  );

  if (!currentPortfolio && loading) {
    return <p>Loading portfolio...</p>;
  }
  if (!currentPortfolio && !loading) {
    return <p>Portfolio not found</p>;
  }

  return (
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
    </div>
  );
}

export default PortfolioView;
