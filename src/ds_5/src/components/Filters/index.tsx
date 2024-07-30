import React, { useState } from 'react';
import debounce from 'lodash.debounce';
import { RiFilterOffFill } from 'react-icons/ri';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { filtersSelector } from '../../redux/features/filters/selectors';
import { clearCurFilters, setCurFilter, setFullname } from '../../redux/features/filter/slice';

import { CoobDataI, Status } from '../../redux/mainTypes';

import { SelectCustom } from '../';

import styles from './Filters.module.scss';

const posts = [];
const divisions = [];

export const Filters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters, status } = useAppSelector(filtersSelector);
  const [value, setValue] = useState('');
  const [isReset, setIsReset] = useState(false);

  const onClickFilter = (filter: CoobDataI) => {
    setIsReset(false);
    dispatch(setCurFilter(filter));
    console.log(filter);
  };

  const onChangeSearchValue = (val: string) => {
    setValue(val);
    updateSearchValue(val);
  };

  const updateSearchValue = React.useCallback(
    debounce((value) => dispatch(setFullname(value)), 808),
    []
  );

  const onClickResetFilters = () => {
    dispatch(clearCurFilters());
    setValue('');
    setIsReset(true);
  };

  return (
    <div className={styles.root}>
      <input
        onChange={(e) => onChangeSearchValue(e.currentTarget.value)}
        className={styles.root_search}
        type="text"
        placeholder="Поиск по ФИО"
        value={value}
      />
      {status === Status.Fulfilled ? (
        <>
          <SelectCustom
            isReset={isReset}
            onClickFilter={onClickFilter}
            selectTitle={'Должность'}
            options={filters[0]}
          />
          <SelectCustom
            isReset={isReset}
            onClickFilter={onClickFilter}
            selectTitle={'Подразделение'}
            options={filters[1]}
          />
        </>
      ) : status === Status.Pending ? (
        'Загрузка...'
      ) : status === Status.Rejected ? (
        'Ошибка('
      ) : (
        'Нет данных'
      )}
      <button onClick={onClickResetFilters} className={styles.root_btn}>
        <RiFilterOffFill />
      </button>
    </div>
  );
};
