import React from 'react';

import styles from './TableCustom.module.scss';

type TableCustomPropsT = {
  rows: { [key: string]: string }[];
};

const columns = [
  { label: 'ФИО', accessor: 'fullname' },
  { label: 'Должность', accessor: 'employee_post' },
  { label: 'Подразделение', accessor: 'division' }
];

export const TableCustom: React.FC<TableCustomPropsT> = ({ rows }) => {
  return (
    <table className={styles.root}>
      <thead className={styles.root__head}>
        <tr>
          {columns.map((col) => (
            <th key={col.accessor} scope="col">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            {columns.map((col) => (
              <td key={col.accessor}>{row[col.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};
