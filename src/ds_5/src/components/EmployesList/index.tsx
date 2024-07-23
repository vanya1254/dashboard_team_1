import React, { useEffect } from 'react';

import { useAppSelector } from '../../redux/store';
import { Status } from '../../redux/mainTypes';
import { employeesSelector } from '../../redux/features/employees/selectors';
import { filtersSelector } from '../../redux/features/filters/selectors';

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
  const { employees, status } = useAppSelector(employeesSelector);

  // console.log(employees);

  return (
    <div className={styles.root}>
      <Filters />
      {status === Status.Fulfilled ? <TableCustom rows={employees} /> : 'LOADING'}
    </div>
  );
};
