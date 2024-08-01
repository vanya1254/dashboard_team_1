import React from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setEmployee } from '../../redux/features/empDash/slice';
import { empDashSelector } from '../../redux/features/empDash/selectors';
import { employeesSelector } from '../../redux/features/employees/selectors';

import { Status, EmployeeT } from '../../redux/mainTypes';

import styles from './TableCustom.module.scss';

// Конфигурация столбцов таблицы
const columns = [
  { label: 'ФИО', accessor: 'fullname' },
  { label: 'Должность', accessor: 'position' },
  { label: 'Подразделение', accessor: 'department' }
];

/**
 * Компонент TableCustom отображает список сотрудников в виде таблицы.
 *
 * Использует данные из Redux store для получения списка сотрудников и текущего выбранного сотрудника.
 *
 * Включает:
 * - Отображение списка сотрудников с возможностью выбора.
 * - Стилизация активной строки при выборе сотрудника.
 * - Обработка различных состояний загрузки данных (Fulfilled, Pending, Rejected, No Data).
 *
 * При клике на строку таблицы вызывается функция `onClickEmployee`, которая устанавливает выбранного сотрудника в Redux store.
 */
export const TableCustom: React.FC = () => {
  const dispatch = useAppDispatch();
  const { employees, status } = useAppSelector(employeesSelector);
  const { employee } = useAppSelector(empDashSelector);

  // Функция для обработки клика на сотрудника
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
