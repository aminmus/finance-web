import React from 'react';
import {
  Link, Route, Switch, useRouteMatch,
} from 'react-router-dom';
import { usePortfolios } from '../contexts/usePortfolios';
import CreatePortfolio from './CreatePortfolio';
import PortfolioView from './PortfolioView';

function PortfoliosView() {
  const portfoliosCtx = usePortfolios();
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/create`}>
        <CreatePortfolio />
      </Route>
      <Route path={`${match.path}/:portfolioId`}>
        {/* <ProvidePortfolios> */}
        <PortfolioView />
        {/* </ProvidePortfolios> */}
      </Route>
      <Route path="/">
        <div>
          <h1>My portfolios</h1>
          <Link to={`${match.path}/create`}>Create a portfolio</Link>
          <ul>
            {portfoliosCtx?.data && portfoliosCtx.data
              .filter(Boolean)
              .map((portfolio) => (portfolio && (
                <li key={portfolio.id}>
                  <Link to={`${match.url}/${portfolio.id}`}>
                    <p>{portfolio.name}</p>
                    <p>{portfolio.description}</p>
                    <p>{portfolio.assetQuantity}</p>
                  </Link>
                </li>
              )))}
          </ul>
        </div>
      </Route>
    </Switch>
  );
}

export default PortfoliosView;
