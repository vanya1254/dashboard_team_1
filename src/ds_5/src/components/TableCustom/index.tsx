import React from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setEmployee } from '../../redux/features/empDash/slice';
import { empDashSelector } from '../../redux/features/empDash/selectors';
import { employeesSelector } from '../../redux/features/employees/selectors';

import { Status, EmployeeT } from '../../redux/mainTypes';

import styles from './TableCustom.module.scss';

// Используются только в этом компоненте
const columns = [
  { label: 'ФИО', accessor: 'fullname' },
  { label: 'Должность', accessor: 'position' },
  { label: 'Подразделение', accessor: 'department' }
];

export const TableCustom: React.FC = () => {
  const dispatch = useAppDispatch();
  const { employees, status } = useAppSelector(employeesSelector);
  const { employee } = useAppSelector(empDashSelector);

  const onClickEmployee = (employee: EmployeeT) => {
    dispatch(setEmployee(employee));
  };

  return (
    <ul className={`${styles.root} scroller`}>
      {status === Status.Fulfilled
        ? employees.map((row, i) => (
            <li
              key={i}
              onClick={() => onClickEmployee(row)}
              className={`${styles.root__row}${
                employee.fact_empl_skills_employee_key === row.fact_empl_skills_employee_key ? ' activeOption' : ''
              }`}
            >
              {columns.map((col) => (
                <span key={col.accessor} className={styles.root__col}>
                  {row[col.accessor]}
                </span>
              ))}
            </li>
          ))
        : status === Status.Pending
        ? 'Загрузка...'
        : status === Status.Rejected
        ? 'Ошибка('
        : 'Нет данных'}
    </ul>
  );
};
