import React, { useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchFilters } from '../../redux/features/filters/slice';
import { fetchDepDash } from '../../redux/features/depDash/slice';
import { filterSelector } from '../../redux/features/filter/selectors';

import { DepartmentGridLayout } from '../../layouts/DepartmentGridLayout';
import { CardLayout } from '../../layouts/CardLayout';

import { DepFilters, SimpleAreaChartCustom, StackedMixBarChart, TagCloudCustom } from '../../components';

import styles from './DepartmentPage.module.scss';
import { clearCurFilters } from '../../redux/features/filter/slice';

const DepartmentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isFirstLoading = useRef(true);
  const { position, department, skill_type } = useAppSelector(filterSelector);

  useEffect(() => {
    if (isFirstLoading.current) {
      dispatch(clearCurFilters());
      dispatch(fetchFilters({}));
    }
  }, []);

  useEffect(() => {
    dispatch(
      fetchDepDash({
        allFilters: {
          department: department,
          position: position,
          skill_type: skill_type
        }
      })
    );
  }, [position, department, skill_type]);

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
