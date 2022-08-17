import React from 'react';
import { useParams } from 'react-router-dom';
import { usePortfolios } from '../usePortfolios';

type Props = {};

// eslint-disable-next-line no-empty-pattern
function Portfolio({ }: Props) {
  // @TODO: Either we add all the portfolios data inside portfolios context,
  // or we fetch the single portfolio by itself (with or without using context again for it).
  // const usePortfolios()

  // @ts-ignore
  const { portfolioId } = useParams();
  console.log(portfolioId);
  return (
    <p>Portfolio</p>
  );
}

export default Portfolio;
