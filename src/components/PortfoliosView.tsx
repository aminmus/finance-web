import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { usePortfolios } from '../usePortfolios';

function PortfoliosView() {
  const { data, loading, error } = usePortfolios();
  const match = useRouteMatch();

  useEffect(() => {
    console.log({ data, loading, error });
  }, [data, loading, error]);
  console.log('reloading?');

  return (
    <div>
      <p>Portfolios View</p>
      <ul>
        {data && data.map((portfolio) => (

          <li key={portfolio.id}>
            <Link to={`${match.url}/${portfolio.id}`}>
              <p>{portfolio.name}</p>
              <p>{portfolio.description}</p>
              <p>{portfolio.assetQuantity}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PortfoliosView;
