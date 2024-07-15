import React from 'react';
import { CustomizedLayoutI } from '../../types/global';

import styles from './Dashlet.module.scss';

interface DasletLayoutPropsI extends CustomizedLayoutI {
  title: string;
  width: string;
  height: string;
}

export const DashletLayout: React.FC<DasletLayoutPropsI> = ({ title, width, height, children, className }) => {
  return (
    <div className={styles.root}>
      <h3 className={styles.root_title}>{title}</h3>
      <div className={`${styles.root__chartWrapper}${className ? ` ${className}` : ''}`} style={{ width, height }}>
        {children}
      </div>
    </div>
  );
};
