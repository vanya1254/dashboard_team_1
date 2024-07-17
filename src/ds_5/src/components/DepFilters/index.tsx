import React from 'react';

import { SelectCustom } from '../SelectCustom';

import styles from './DepFilters.module.scss';

export const DepFilters: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.root_title}>Выбор объекта анализа</h1>
      <div className={styles.root__filters}>
        <SelectCustom onClickFilter={() => {}} selectTitle={'Выбор подразделения'} options={[]} />
        <SelectCustom onClickFilter={() => {}} selectTitle={'Выбор должности'} options={[]} />
        <SelectCustom onClickFilter={() => {}} selectTitle={'Категории сравнения'} options={[]} />
      </div>
    </div>
  );
};
