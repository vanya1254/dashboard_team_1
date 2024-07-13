import React from 'react';
import { ChildrenI } from '../../types/global';

import styles from './MainGridLayout.module.scss';

export const MainGridLayout: React.FC<ChildrenI> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};
