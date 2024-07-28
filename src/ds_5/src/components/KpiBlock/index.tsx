import React from 'react';

import styles from './KpiBlock.module.scss';

type KpiBlockT = {
  icon: JSX.Element;
  title: string;
  value: string;
};

export const KpiBlock: React.FC<KpiBlockT> = ({ icon, title, value }) => {
  return (
    <div className={styles.root}>
      <span className={styles.root_icon}>{icon}</span>
      <h4 className={styles.root_title}>{title}</h4>
      <span className={styles.root_value}>{value}</span>
    </div>
  );
};
