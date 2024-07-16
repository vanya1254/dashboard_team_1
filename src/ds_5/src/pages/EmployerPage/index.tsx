import React from 'react';

import { MainGridLayout } from '../../layouts/MainGridLayout';
import { CardLayout } from '../../layouts/CardLayout';

import {
  BarChartCustom,
  EmployeeCard,
  EmployesList,
  RadarChartCustom,
  SkillsList,
  StackedAreaChartCustom
} from '../../components';

import styles from './EmployerPage.module.scss';

const EmployerPage: React.FC = () => {
  return (
    <MainGridLayout>
      <CardLayout className={styles.root__filters}>
        <EmployesList />
      </CardLayout>
      <CardLayout className={styles.root__employee}>
        <EmployeeCard />
      </CardLayout>
      <CardLayout className={styles.root__categories}>
        <SkillsList />
      </CardLayout>
      <CardLayout className={styles.root__upgrade}>
        <StackedAreaChartCustom />
      </CardLayout>
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
