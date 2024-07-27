import React, { useState } from 'react';
import { RiFilterOffFill } from 'react-icons/ri';

import { setCurFilter, clearCurFilters } from '../../redux/features/filter/slice';
import { filtersSelector } from '../../redux/features/filters/selectors';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { CoobDataI, Status } from '../../redux/mainTypes';

import { SelectCustom } from '../SelectCustom';

import styles from './DepFilters.module.scss';
import { SKILL_TYPES } from '../../constants';
import getKeyByValue from '../../utils/getKeyByValue';

export const DepFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters, status } = useAppSelector(filtersSelector);
  const [isReset, setIsReset] = useState(false);

  const onClickFilter = (filter: CoobDataI) => {
    if (filter.skill_type && filter.skill_type !== 'Все') {
      const key = getKeyByValue(SKILL_TYPES, filter.skill_type);

      filter.skill_type = Number.parseInt(key);
    }
    setIsReset(false);
    dispatch(setCurFilter(filter));
  };

  const onClickResetFilters = () => {
    dispatch(clearCurFilters());
    setIsReset(true);
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.root_title}>Выбор объекта анализа</h1>
      <div className={styles.root__filters}>
        {status === Status.Fulfilled ? (
          <>
            <SelectCustom
              isReset={isReset}
              onClickFilter={onClickFilter}
              selectTitle={'Выбор подразделения'}
              options={filters[0]}
            />
            <SelectCustom
              isReset={isReset}
              onClickFilter={onClickFilter}
              selectTitle={'Выбор должности'}
              options={filters[1]}
            />
            <SelectCustom
              isReset={isReset}
              onClickFilter={onClickFilter}
              selectTitle={'Категории сравнения'}
              options={filters[2].map((item) => ({
                skill_type: SKILL_TYPES[item.skill_type] || item.skill_type
              }))}
            />
          </>
        ) : status === Status.Pending ? (
          'LOADING'
        ) : (
          ''
        )}
        <button onClick={onClickResetFilters} className={styles.root_btn}>
          <RiFilterOffFill />
        </button>
      </div>
    </div>
  );
};
