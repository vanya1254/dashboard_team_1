import React from 'react';
import { CustomizedLayoutI } from '../../types/global';

import styles from './DepartmentGridLayout.module.scss';

/**
 * Компонент DepartmentGridLayout предназначен для создания контейнера, который может использоваться для размещения содержимого в виде сетки.
 *
 * @param className Дополнительный класс для стилизации контейнера, который добавляется к основному классу.
 * @param children Содержимое, которое будет отображаться внутри контейнера.
 */
export const DepartmentGridLayout: React.FC<CustomizedLayoutI> = ({ className, children }) => {
  return <div className={`${styles.root}${className ? ` ${className}` : ''}`}>{children}</div>;
};
