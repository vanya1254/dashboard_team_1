import React, { useState } from 'react';
import debounce from 'lodash.debounce';
import { FaSortAlphaDown } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { filtersSelector } from '../../redux/features/filters/selectors';
import { setCurFilter, setFullname } from '../../redux/features/filter/slice';

import { CoobDataI, Status } from '../../redux/mainTypes';

import { SelectCustom } from '../';

import styles from './Filters.module.scss';

const posts = [];
const divisions = [];

export const Filters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters, status } = useAppSelector(filtersSelector);
  const [value, setValue] = useState('');

  const onClickFilter = (filter: CoobDataI) => {
    dispatch(setCurFilter(filter));
  };

  const onChangeSearchValue = (val: string) => {
    setValue(val);
    updateSearchValue(val);
  };

  const updateSearchValue = React.useCallback(
    debounce((value) => dispatch(setFullname(value.toLowerCase())), 404),
    []
  );

  return (
    <div className={styles.root}>
      <input
        onChange={(e) => onChangeSearchValue(e.currentTarget.value)}
        className={styles.root_search}
        type="text"
        placeholder="Поиск по ФИО"
        value={value}
      />
      {/* <button className={styles.root_btn}>
          <IoSearch />
        </button> */}
      {status === Status.Fulfilled ? (
        <>
          <SelectCustom onClickFilter={onClickFilter} selectTitle={'Должность'} options={filters[0]} />
          <SelectCustom onClickFilter={onClickFilter} selectTitle={'Подразделение'} options={filters[1]} />
        </>
      ) : (
        'Loading...'
      )}
      {/* <button className={styles.root_btn}>
        <FaSortAlphaDown />
      </button> */}
    </div>
  );
};
