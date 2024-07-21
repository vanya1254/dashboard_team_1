import React from 'react';

import styles from './TableCustom.module.scss';

type TableCustomPropsT = {
  rows: { [key: string]: string }[];
};

const columns = [
  { label: 'ФИО', accessor: 'fullname' },
  { label: 'Должность', accessor: 'position' },
  { label: 'Подразделение', accessor: 'department' }
];

export const TableCustom: React.FC<TableCustomPropsT> = ({ rows }) => {
  return (
    <ul className={`${styles.root} scroll`}>
      {rows.map((row, i) => (
        <li key={i} className={styles.root__row}>
          {columns.map((col) => (
            <span key={col.accessor} className={styles.root__col}>
              {row[col.accessor]}
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
};
