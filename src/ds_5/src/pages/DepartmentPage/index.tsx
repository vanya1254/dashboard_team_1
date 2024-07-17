import React from 'react';

import { DepartmentGridLayout } from '../../layouts/DepartmentGridLayout';

import styles from './DepartmentPage.module.scss';
import { CardLayout } from '../../layouts/CardLayout';

const DepartmentPage: React.FC = () => {
  return (
    <section className={styles.root}>
      <CardLayout className={styles.root__filters}>[]</CardLayout>
      <DepartmentGridLayout className={styles.root__grid}>
        <CardLayout className={styles.root__deps}>[]</CardLayout>
        <CardLayout className={styles.root__skills}>[]</CardLayout>
        <CardLayout className={styles.root__dynamic}>[]</CardLayout>
      </DepartmentGridLayout>
    </section>
  );
};

export default DepartmentPage;
