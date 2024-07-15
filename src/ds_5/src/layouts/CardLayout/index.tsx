import React from 'react';
import { CustomizedLayoutI } from '../../types/global';

import styles from './CardLayout.module.scss';

export const CardLayout: React.FC<CustomizedLayoutI> = ({ children, className }) => {
  return <div className={`${styles.root}${className ? ` ${className}` : ''}`}>{children}</div>;
};
