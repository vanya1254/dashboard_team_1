import React, { useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchFilters } from '../../redux/features/filters/slice';
import { fetchDepDash } from '../../redux/features/depDash/slice';
import { clearCurFilters } from '../../redux/features/filter/slice';
import { filterSelector } from '../../redux/features/filter/selectors';

import { KOOB_ID_DEP } from '../../constants';

import { DepartmentGridLayout } from '../../layouts/DepartmentGridLayout';
import { CardLayout } from '../../layouts/CardLayout';

import { DepFilters, SimpleAreaChartCustom, StackedMixBarChart, TagCloudCustom } from '../../components';

import styles from './DepartmentPage.module.scss';

/**
 * Страница `DepartmentPage` предназначена для отображения информации о подразделениях.
 *
 * Использует различные компоненты для отображения фильтров, тегов, графиков и диаграмм.
 *
 * Эффекты:
 * - При первом рендере сбрасывает текущие фильтры и запрашивает все возможные фильтры для подразделений.
 * - Запрашивает данные для отображения по выбранным фильтрам (позиция, подразделение, тип навыков).
 */
const DepartmentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isFirstLoading = useRef(true);
  const { position, department, skill_type } = useAppSelector(filterSelector);

  // Инициализация при первом рендере
  useEffect(() => {
    if (isFirstLoading.current) {
      dispatch(clearCurFilters()); // Сброс текущих фильтров
      dispatch(fetchFilters({ koobId: KOOB_ID_DEP })); // Запрос всех возможных фильтров
      isFirstLoading.current = false;
    }
  }, [dispatch]);

  // Запрос данных для отображения при изменении фильтров
  useEffect(() => {
    dispatch(
      fetchDepDash({
        koobId: KOOB_ID_DEP,
        allFilters: {
          department: department,
          position: position,
          skill_type: skill_type
        }
      })
    );
  }, [position, department, skill_type, dispatch]);

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
