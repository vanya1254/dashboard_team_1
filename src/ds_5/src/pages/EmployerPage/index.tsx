import React from 'react';

import { MainGridLayout } from '../../layouts/MainGridLayOut';

import styles from './EmployerPage.module.scss';

const EmployerPage: React.FC = () => {
  return (
    <MainGridLayout>
      <MainGridLayout>[]</MainGridLayout>
      <div className={styles.root__emp}></div>
    </MainGridLayout>
  );
};

export default EmployerPage;
