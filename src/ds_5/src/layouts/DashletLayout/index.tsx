import React from 'react';
import { ChildrenI } from '../../types/global';

import styles from './Dashlet.module.scss';

interface DashletLayoutPropsI extends ChildrenI {
  className?: string;
}

export const DashletLayout: React.FC<DashletLayoutPropsI> = ({ children, className }) => {
  return <div className={`${styles.root}${className ? ` ${className}` : ''}`}>{children}</div>;
};
