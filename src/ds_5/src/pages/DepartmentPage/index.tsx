import React from 'react';

import { DepartmentGridLayout } from '../../layouts/DepartmentGridLayout';
import { CardLayout } from '../../layouts/CardLayout';

import { DepFilters, SimpleAreaChartCustom, StackedMixBarChart, TagCloudCustom } from '../../components';

import styles from './DepartmentPage.module.scss';

const DepartmentPage: React.FC = () => {
  return (
    <section className={styles.root}>
      <CardLayout className={styles.root__filters}>
        <DepFilters />
      </CardLayout>
      <DepartmentGridLayout className={styles.root__grid}>
        <CardLayout className={styles.root__deps}>
          <TagCloudCustom />
        </CardLayout>
        <CardLayout className={styles.root__skills}>
          <SimpleAreaChartCustom />
        </CardLayout>
        <CardLayout className={styles.root__dynamic}>
          <StackedMixBarChart />
        </CardLayout>
      </DepartmentGridLayout>
    </section>
  );
};

export default DepartmentPage;
