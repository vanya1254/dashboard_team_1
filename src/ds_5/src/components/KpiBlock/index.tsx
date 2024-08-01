import React from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { IoIosArrowRoundForward } from 'react-icons/io';

import styles from './KpiBlock.module.scss';

type KpiBlockT = {
  icon: JSX.Element;
  title: string;
  value: number;
  subValue?: number;
  isColored: boolean;
};

export const KpiBlock: React.FC<KpiBlockT> = ({ icon, title, value, subValue, isColored }) => {
  return (
    <div className={styles.root}>
      <span className={styles.root_icon}>{icon}</span>
      <h4 className={styles.root_title}>{title}</h4>
      <p
        className={`${styles.root_value}${
          isColored ? (value > 0 ? ` ${styles.root_value_pos}` : ` ${styles.root_value_neg}`) : ''
        }`}
      >
        {isColored ? `${value}%` : `+${value}`}
        {subValue !== undefined ? (
          <>
            <IoIosArrowRoundForward />
            {`+${subValue}`}
          </>
        ) : (
          ''
        )}
        {isColored ? value > 0 ? <TiArrowSortedUp /> : <TiArrowSortedDown /> : ''}
      </p>
    </div>
  );
};
