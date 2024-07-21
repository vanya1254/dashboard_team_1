import React from 'react';
import { FaSortAlphaDown } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';

import { useAppSelector } from '../../redux/store';
import { filtersSelector } from '../../redux/features/filters/selectors';

import { SelectCustom } from '../';

import styles from './Filters.module.scss';
import { Status } from '../../redux/mainTypes';

const posts = [];
const divisions = [];

export const Filters: React.FC = () => {
  const { filters, status } = useAppSelector(filtersSelector);

  return (
    <div className={styles.root}>
      <input className={styles.root_search} type="text" placeholder="Поиск по ФИО" />
      {status === Status.Fulfilled ? (
        <>
          <SelectCustom onClickFilter={(filter) => {}} selectTitle={'Должность'} options={filters[0]} />
          <SelectCustom onClickFilter={(filter) => {}} selectTitle={'Подразделение'} options={filters[1]} />
        </>
      ) : (
        'Loading...'
      )}
      <button className={styles.root_btn}>
        <IoSearch />
      </button>
      <button className={styles.root_btn}>
        <FaSortAlphaDown />
      </button>
    </div>
  );
};
