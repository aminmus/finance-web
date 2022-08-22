import React from 'react';
import { useParams } from 'react-router-dom';
import { usePortfolios } from '../usePortfolios';

type Props = {};

// eslint-disable-next-line no-empty-pattern
function PortfolioView({ }: Props) {
  // @TODO: Either we add all the portfolios data inside portfolios context,
  // or we fetch the single portfolio by itself (with or without using context again for it).
  // const usePortfolios()

  // @ts-ignore
  const { portfolioId } = useParams();
  console.log(portfolioId);
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
