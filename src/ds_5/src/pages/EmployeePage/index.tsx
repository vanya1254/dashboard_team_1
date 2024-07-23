import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchEmployees } from '../../redux/features/employees/slice';
import { fetchFilters } from '../../redux/features/filters/slice';
import { filterSelector } from '../../redux/features/filter/selectors';
import { fetchEmpDash, setEmpSkillsList } from '../../redux/features/empDash/slice';

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
import { empDashSelector } from '../../redux/features/empDash/selectors';
import { Status } from '../../redux/mainTypes';

const EmployerPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { position, department, fullname } = useAppSelector(filterSelector);
  const { status } = useAppSelector(empDashSelector);

  useEffect(() => {
    dispatch(fetchFilters({}));

    dispatch(fetchEmpDash({}));
  }, []);

  useEffect(() => {
    dispatch(fetchEmployees({ measures: [], allFilters: { position, department, fullname } }));
  }, [position, department, fullname]);

  useEffect(() => {
    if (status === Status.Fulfilled) {
      dispatch(setEmpSkillsList());
    }
  }, [status]);

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
