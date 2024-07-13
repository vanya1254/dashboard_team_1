import React from 'react';

import { MainGridLayout } from '../../layouts/MainGridLayOut';
import { RadarChartCustom } from '../../components';

import styles from './EmployerPage.module.scss';

const EmployerPage: React.FC = () => {
  return (
    <MainGridLayout>
      <MainGridLayout>
        <RadarChartCustom />
      </MainGridLayout>
      <div className={styles.root__emp}></div>
    </MainGridLayout>
  );
};

export default EmployerPage;
