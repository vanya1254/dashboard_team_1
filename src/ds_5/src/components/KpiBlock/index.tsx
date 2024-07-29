import React from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import styles from './KpiBlock.module.scss';

type KpiBlockT = {
  icon: JSX.Element;
  title: string;
  value: number;
  isColored: boolean;
};

export const KpiBlock: React.FC<KpiBlockT> = ({ icon, title, value, isColored }) => {
  return (
    <div className={styles.root}>
      <span className={styles.root_icon}>{icon}</span>
      <h4 className={styles.root_title}>{title}</h4>
      <span
        className={`${styles.root_value}${
          isColored ? (value ? ` ${styles.root_value_pos}` : ` ${styles.root_value_neg}`) : ''
        }`}
      >
        {isColored ? `${value}%` : value}
        {isColored ? value ? <TiArrowSortedUp /> : <TiArrowSortedDown /> : ''}
      </span>
    </div>
  );
};
