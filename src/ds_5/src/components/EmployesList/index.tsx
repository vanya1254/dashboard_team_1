import React from 'react';

import { Filters, TableCustom } from '../';

import styles from './EmployesList.module.scss';

/**
 * Компонент EmployesList отображает список сотрудников с возможностью фильтрации и просмотра данных в таблице.
 *
 * - Включает компонент Filters для применения фильтров к списку сотрудников.
 * - Включает компонент TableCustom для отображения данных сотрудников в табличном формате.
 * - Объединяет фильтрацию и отображение данных в одной структуре.
 */
export const EmployesList: React.FC = () => {
  return (
    <div className={styles.root}>
      {/* Компонент для фильтрации данных сотрудников */}
      <Filters />
      {/* Компонент для отображения списка сотрудников в таблице */}
      <TableCustom />
    </div>
  );
};
