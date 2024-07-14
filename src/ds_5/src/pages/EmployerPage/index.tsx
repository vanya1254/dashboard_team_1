import React from 'react';

import { MainGridLayout } from '../../layouts/MainGridLayOut';
import { RadarChartCustom, SkillsList } from '../../components';

import styles from './EmployerPage.module.scss';

const EmployerPage: React.FC = () => {
  return (
    <MainGridLayout>
      <MainGridLayout>
        <RadarChartCustom />
        <SkillsList />
      </MainGridLayout>
      <div className={styles.root__emp}></div>
    </MainGridLayout>
  );
};

export default EmployerPage;
