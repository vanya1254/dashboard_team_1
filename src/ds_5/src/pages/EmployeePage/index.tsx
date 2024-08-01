import React, { useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchEmployees } from '../../redux/features/employees/slice';
import { fetchFilters } from '../../redux/features/filters/slice';
import { clearCurFilters } from '../../redux/features/filter/slice';
import { fetchEmpDash, setEmployeeAndFetchDashboard } from '../../redux/features/empDash/slice';
import { filterSelector } from '../../redux/features/filter/selectors';
import { empDashSelector } from '../../redux/features/empDash/selectors';
import { employeesSelector } from '../../redux/features/employees/selectors';

import { KOOB_ID_EMP } from '../../constants';

import { EmployeeGridLayout } from '../../layouts/EmployeeGridLayout';
import { CardLayout } from '../../layouts/CardLayout';

import {
  BarChartCustom,
  EmployeeCard,
  EmployesList,
  KpiList,
  RadarChartCustom,
  SkillsList,
  StackedAreaChartCustom
} from '../../components';

import styles from './EmployeePage.module.scss';

/**
 * Страница `EmployerPage` отвечает за отображение информации о сотрудниках и их навыках.
 *
 * Использует различные компоненты для отображения списка сотрудников, карточек сотрудников, навыков, KPI и графиков.
 *
 * Эффекты:
 * - При первом рендере сбрасывает текущие фильтры и запрашивает все возможные фильтры.
 * - Запрашивает список сотрудников при изменении фильтров.
 * - Устанавливает первого сотрудника активным и запрашивает данные для него.
 * - Запрашивает данные для выбранного сотрудника при изменении активного сотрудника.
 */
const EmployerPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isFirstLoading = useRef(true);
  const { position, department, fullname } = useAppSelector(filterSelector);
  const { employee } = useAppSelector(empDashSelector);
  const { employees } = useAppSelector(employeesSelector);

  // Инициализация при первом рендере
  useEffect(() => {
    if (isFirstLoading.current) {
      dispatch(clearCurFilters()); // Сброс фильтров
      dispatch(fetchFilters({ koobId: KOOB_ID_EMP })); // Запрос всех возможных фильтров
      isFirstLoading.current = false;
    }
  }, [dispatch]);

  // Запрос списка сотрудников при изменении фильтров
  useEffect(() => {
    dispatch(fetchEmployees({ koobId: KOOB_ID_EMP, measures: [], allFilters: { position, department, fullname } }));
  }, [position, department, fullname, dispatch]);

  // Установка первого сотрудника активным и запрос данных для него
  useEffect(() => {
    if (employees.length > 0) {
      dispatch(setEmployeeAndFetchDashboard({ koobId: KOOB_ID_EMP, employees }));
    }
  }, [employees, dispatch]);

  // Запрос данных для выбранного сотрудника
  useEffect(() => {
    if (employee.fullname) {
      dispatch(
        fetchEmpDash({
          koobId: KOOB_ID_EMP,
          allFilters: {
            fullname: ['=', employee.fullname],
            position: ['=', employee.position],
            department: ['=', employee.department]
          }
        })
      );
    }
  }, [employee, dispatch]);

  return (
    <EmployeeGridLayout>
      <CardLayout className={styles.root__filters}>
        <EmployesList />
      </CardLayout>
      <CardLayout className={styles.root__employee}>
        <EmployeeCard />
      </CardLayout>
      <div className={styles.root__categories}>
        <CardLayout>
          <SkillsList />
        </CardLayout>
        <CardLayout>
          <KpiList />
        </CardLayout>
      </div>
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
