import React from 'react';
import { UrlState } from 'bi-internal/core';

type RoutePropsT = {
  pageName: string[];
  children: React.ReactNode;
};

export const Route: React.FC<RoutePropsT> = ({ pageName = [], children }) => {
  const stateCharts = UrlState.getModel();
  const { dboard } = stateCharts;

  if (!pageName.length && (dboard === '1' || !dboard)) {
    return <>{children}</>;
  }

  return dboard && pageName.includes(dboard) ? <>{children}</> : null;
};
