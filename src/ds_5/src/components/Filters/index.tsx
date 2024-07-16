import React from 'react';
import { FaSortAlphaDown } from 'react-icons/fa';

import { SelectCustom } from '../SelectCustom';

import styles from './Filters.module.scss';

export const Filters: React.FC = () => {
  return (
    <div className={styles.root}>
      <input type="text" />
      <button>
        <FaSortAlphaDown />
      </button>
      <SelectCustom onClickFilter={(filter) => {}} selectTitle={'Должность'} options={[]} />
      <SelectCustom onClickFilter={(filter) => {}} selectTitle={'Подразделение'} options={[]} />
      <button>Поиск</button>
    </div>
  );
};
