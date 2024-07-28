import React, { useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchEmployees } from '../../redux/features/employees/slice';
import { fetchFilters } from '../../redux/features/filters/slice';
import { fetchEmpDash, setEmployeeAndFetchDashboard } from '../../redux/features/empDash/slice';
import { filterSelector } from '../../redux/features/filter/selectors';
import { empDashSelector } from '../../redux/features/empDash/selectors';
import { employeesSelector } from '../../redux/features/employees/selectors';

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
import { clearCurFilters } from '../../redux/features/filter/slice';

const EmployerPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isFirstLoading = useRef(true);
  const { position, department, fullname } = useAppSelector(filterSelector);
  const { employee } = useAppSelector(empDashSelector);
  const { employees } = useAppSelector(employeesSelector);

  useEffect(() => {
    if (isFirstLoading.current) {
      dispatch(clearCurFilters());
      dispatch(fetchFilters({}));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchEmployees({ measures: [], allFilters: { position, department, fullname } }));
  }, [position, department, fullname]);

  useEffect(() => {
    dispatch(setEmployeeAndFetchDashboard(employees));
  }, [employees]);

  useEffect(() => {
    if (employee.fullname) {
      dispatch(
        fetchEmpDash({
          allFilters: {
            fullname: ['=', employee.fullname],
            position: ['=', employee.position],
            department: ['=', employee.department]
          }
        })
      );
    }
  }, [employee]);

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
