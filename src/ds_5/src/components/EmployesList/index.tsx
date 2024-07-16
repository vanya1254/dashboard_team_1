import React from 'react';

import { Filters, TableCustom } from '../';

import styles from './EmployesList.module.scss';

const rows = [
  { fullname: 'Иван Иванов', employee_post: 'Разработчик', division: 'ИТ отдел' },
  { fullname: 'Ольга Петрова', employee_post: 'Менеджер', division: 'Отдел продаж' },
  { fullname: 'Сергей Смирнов', employee_post: 'Аналитик', division: 'Аналитический отдел' },
  { fullname: 'Ольга Петрова', employee_post: 'Менеджер', division: 'Отдел продаж' },
  { fullname: 'Сергей Смирнов', employee_post: 'Аналитик', division: 'Аналитический отдел' },
  { fullname: 'Ольга Петрова', employee_post: 'Менеджер', division: 'Отдел продаж' },
  { fullname: 'Сергей Смирнов', employee_post: 'Аналитик', division: 'Аналитический отдел' }
];

export const EmployesList: React.FC = () => {
  return (
    <div className={styles.root}>
      <Filters />
      <TableCustom rows={rows} />
    </div>
  );
};
