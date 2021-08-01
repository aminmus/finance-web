import React, { useEffect } from 'react';
import { usePortfolios } from '../usePortfolios';

function AssetsView() {
  const { data, loading, error } = usePortfolios();
  useEffect(() => {
    console.log({ data, loading, error });
  }, [data, loading, error]);
  return (
    <p>Assets view</p>
  );
}

export default AssetsView;
