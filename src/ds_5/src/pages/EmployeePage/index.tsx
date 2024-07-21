import React, { useEffect } from 'react';

import { EmployeeGridLayout } from '../../layouts/EmployeeGridLayout';
import { CardLayout } from '../../layouts/CardLayout';

import {
  BarChartCustom,
  EmployeeCard,
  EmployesList,
  RadarChartCustom,
  SkillsList,
  StackedAreaChartCustom
} from '../../components';

import styles from './EmployeePage.module.scss';
import { useAppDispatch } from '../../redux/store';
import { fetchEmployees } from '../../redux/features/employees/slice';
import { fetchFilters } from '../../redux/features/filters/slice';

const EmployerPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilters({}));
  }, []);

  useEffect(() => {
    dispatch(fetchEmployees({ measures: [], allFilters: {} }));
  }, []);

  return (
    <EmployeeGridLayout>
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
    </EmployeeGridLayout>
  );
};

export default EmployerPage;
