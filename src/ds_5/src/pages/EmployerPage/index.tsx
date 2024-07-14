import React from 'react';

import { MainGridLayout } from '../../layouts/MainGridLayout';
import { RadarChartCustom, SkillsList } from '../../components';

import styles from './EmployerPage.module.scss';
import { BarChartCustom } from '../../components/BarChartCustom';

const EmployerPage: React.FC = () => {
  return (
    <MainGridLayout>
      <MainGridLayout>
        <RadarChartCustom />
        <SkillsList />
        <div className={styles.root__bar}>
          <BarChartCustom />
        </div>
      </MainGridLayout>
      <div className={styles.root__emp}></div>
    </MainGridLayout>
  );
};

export default EmployerPage;
