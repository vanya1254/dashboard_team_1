import React from 'react';
import { CustomizedLayoutI } from '../../types/global';

import styles from './Dashlet.module.scss';

interface DasletLayoutPropsI extends CustomizedLayoutI {
  title: string; // Заголовок, который будет отображаться над содержимым
  width: string; // Ширина для контейнера графика
  height: string; // Высота для контейнера графика
}

/**
 * Компонент DashletLayout используется для создания контейнера с заголовком и областью для отображения графиков или других визуализаций.
 *
 * @param title Заголовок, который отображается над содержимым контейнера.
 * @param width Ширина области для отображения содержимого.
 * @param height Высота области для отображения содержимого.
 * @param children Содержимое, которое будет отображаться внутри области для графиков.
 * @param className Дополнительный класс для стилизации контейнера, который добавляется к основному классу.
 */
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
