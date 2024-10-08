import React, { useState } from 'react';
import { RiFilterOffFill } from 'react-icons/ri';

import { setCurFilter, clearCurFilters } from '../../redux/features/filter/slice';
import { filtersSelector } from '../../redux/features/filters/selectors';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { CoobDataI, Status } from '../../redux/mainTypes';

import { SKILL_TYPES } from '../../constants';

import getKeyByValue from '../../utils/getKeyByValue';

import { SelectCustom } from '../SelectCustom';

import styles from './DepFilters.module.scss';

/**
 * Компонент DepFilters предоставляет интерфейс для фильтрации данных по различным параметрам,
 * таким как подразделение, должность и категория навыков.
 *
 * - Использует SelectCustom для отображения выпадающих списков с возможностью выбора.
 * - Фильтры могут быть сброшены с помощью кнопки, при этом все выбранные фильтры сбрасываются.
 * - Состояние загрузки отображается при получении данных.
 */
export const DepFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters, status } = useAppSelector(filtersSelector);
  const [isReset, setIsReset] = useState(false);

  // Обработка выбора фильтра, преобразование и отправка в глобальное состояние
  const onClickFilter = (filter: CoobDataI) => {
    if (filter.skill_type && filter.skill_type !== 'Все') {
      const key = getKeyByValue(SKILL_TYPES, filter.skill_type);
      //@ts-ignore
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
              options={filters[1]}
            />
            <SelectCustom
              isReset={isReset}
              onClickFilter={onClickFilter}
              selectTitle={'Выбор должности'}
              options={filters[0]}
            />
            <SelectCustom
              isReset={isReset}
              onClickFilter={onClickFilter}
              selectTitle={'Категории навыков'}
              options={filters[2].map((item) => ({
                skill_type: SKILL_TYPES[item.skill_type] || item.skill_type
              }))}
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
    </div>
  );
};
