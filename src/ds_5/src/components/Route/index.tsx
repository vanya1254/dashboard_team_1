import React from 'react';
import { UrlState } from 'bi-internal/core';

type RoutePropsT = {
  pageName: string[];
  children: React.ReactNode;
};

/**
 * Компонент Route используется для условного рендеринга дочерних элементов в зависимости от текущей страницы.
 *
 * - pageName: массив имен страниц, на которых следует рендерить дочерние элементы.
 * - children: дочерние элементы, которые будут отображаться, если условие выполнения совпадает.
 *
 * Компонент получает текущее состояние дашборда из UrlState. Если dboard соответствует одному из имен страниц
 * в pageName или dboard равно '1', или его нет, то компонент рендерит дочерние элементы.
 * В противном случае компонент возвращает null и ничего не рендерит.
 */
export const Route: React.FC<RoutePropsT> = ({ pageName = [], children }) => {
  const stateCharts = UrlState.getModel();
  const { dboard } = stateCharts;

  // Если нет имен страниц и dboard равно '1' или dboard не определен, отображать children
  if (!pageName.length && (dboard === '1' || !dboard)) {
    return <>{children}</>;
  }

  // Если dboard совпадает с одним из имен страниц в pageName, отображать children
  return dboard && pageName.includes(dboard) ? <>{children}</> : null;
};
