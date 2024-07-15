import React from 'react';

import { MainGridLayout } from '../../layouts/MainGridLayout';
import { EmployeeCard, RadarChartCustom, SkillsList } from '../../components';

import styles from './EmployerPage.module.scss';
import { BarChartCustom } from '../../components/BarChartCustom';
import { CardLayout } from '../../layouts/CardLayout';
import { DashletLayout } from '../../layouts/DashletLayout';

const EmployerPage: React.FC = () => {
  return (
    <MainGridLayout>
      <CardLayout className={styles.root__filters}>[]</CardLayout>
      <CardLayout className={styles.root__employee}>
        <EmployeeCard />
      </CardLayout>
      <CardLayout className={styles.root__categories}>
        <SkillsList />
      </CardLayout>
      <CardLayout className={styles.root__upgrade}>[]</CardLayout>
      <CardLayout className={styles.root__radar}>
        <RadarChartCustom />
      </CardLayout>
      <CardLayout className={styles.root__bar}>
        <BarChartCustom />
      </CardLayout>
    </MainGridLayout>
  );
};

export default EmployerPage;
