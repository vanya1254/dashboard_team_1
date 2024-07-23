import React from 'react';

import { Filters, TableCustom } from '../';

import styles from './EmployesList.module.scss';

export const EmployesList: React.FC = () => {
  return (
    <div className={styles.root}>
      <Filters />
      <TableCustom />
    </div>
  );
};
