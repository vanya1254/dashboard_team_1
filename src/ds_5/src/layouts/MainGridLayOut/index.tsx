import React from 'react';
import { CustomizedLayoutI } from '../../types/global';

import styles from './MainGridLayout.module.scss';

export const MainGridLayout: React.FC<CustomizedLayoutI> = ({ className, children }) => {
  return <div className={`${styles.root}${className ? ` ${className}` : ''}`}>{children}</div>;
};
