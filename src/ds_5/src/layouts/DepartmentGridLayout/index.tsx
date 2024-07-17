import React from 'react';
import { CustomizedLayoutI } from '../../types/global';

import styles from './DepartmentGridLayout.module.scss';

export const DepartmentGridLayout: React.FC<CustomizedLayoutI> = ({ className, children }) => {
  return <div className={`${styles.root}${className ? ` ${className}` : ''}`}>{children}</div>;
};
