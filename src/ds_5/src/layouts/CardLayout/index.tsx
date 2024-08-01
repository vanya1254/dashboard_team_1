import React from 'react';
import { CustomizedLayoutI } from '../../types/global';

import styles from './CardLayout.module.scss';

/**
 * Компонент CardLayout представляет собой контейнер для отображения контента в виде карточки.
 *
 * Используется для оборачивания и стилизации элементов в виде карточки с дополнительными классами, если это необходимо.
 *
 * @param children Содержимое, которое будет отображаться внутри карточки.
 * @param className Дополнительный класс для стилизации карточки, который добавляется к основному классу.
 */
export const CardLayout: React.FC<CustomizedLayoutI> = ({ children, className }) => {
  return <div className={`${styles.root}${className ? ` ${className}` : ''}`}>{children}</div>;
};
