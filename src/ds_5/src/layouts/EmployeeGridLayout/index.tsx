import React from 'react';
import { CustomizedLayoutI } from '../../types/global';

import styles from './EmployeeGridLayout.module.scss';

export const EmployeeGridLayout: React.FC<CustomizedLayoutI> = ({ className, children }) => {
  return <div className={`${styles.root}${className ? ` ${className}` : ''}`}>{children}</div>;
};
