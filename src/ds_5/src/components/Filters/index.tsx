import React from 'react';
import { FaSortAlphaDown } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';

import { SelectCustom } from '../SelectCustom';

import styles from './Filters.module.scss';

const posts = [];
const divisions = [];

export const Filters: React.FC = () => {
  return (
    <div className={styles.root}>
      <input className={styles.root_search} type="text" placeholder="Поиск по ФИО" />
      <button className={styles.root_btn}>
        <FaSortAlphaDown />
      </button>
      <SelectCustom onClickFilter={(filter) => {}} selectTitle={'Должность'} options={posts} />
      <SelectCustom onClickFilter={(filter) => {}} selectTitle={'Подразделение'} options={divisions} />
      <button className={styles.root_btn}>
        <IoSearch />
      </button>
    </div>
  );
};
