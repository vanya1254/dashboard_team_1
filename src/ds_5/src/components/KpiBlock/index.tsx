import React from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { IoIosArrowRoundForward } from 'react-icons/io';

import styles from './KpiBlock.module.scss';

/**
 * Типы пропсов для компонента KpiBlock.
 */
type KpiBlockT = {
  icon: JSX.Element; // Иконка, отображаемая в блоке.
  title: string; // Заголовок KPI блока.
  value: number; // Основное значение KPI.
  subValue?: number; // Дополнительное значение, если имеется.
  isColored: boolean; // Флаг для изменения цвета текста в зависимости от значения.
};

/**
 * Компонент KpiBlock представляет собой блок для отображения ключевых показателей эффективности (KPI).
 *
 * - Включает иконку, заголовок, основное и дополнительное значение.
 * - Опционально изменяет цвет текста в зависимости от значения (положительное или отрицательное).
 * - Отображает стрелки вверх или вниз для указания изменения направления.
 */
export const KpiBlock: React.FC<KpiBlockT> = ({ icon, title, value, subValue, isColored }) => {
  return (
    <div className={styles.root}>
      <span className={styles.root_icon}>{icon}</span>
      <h4 className={styles.root_title}>{title}</h4>
      <p
        className={`${styles.root_value}${
          isColored ? (value > 0 ? ` ${styles.root_value_pos}` : ` ${styles.root_value_neg}`) : ''
        }`}
      >
        {isColored ? `${value}%` : `+${value}`}
        {subValue !== undefined ? (
          <>
            <IoIosArrowRoundForward />
            {`+${subValue}`}
          </>
        ) : (
          ''
        )}
        {isColored ? value > 0 ? <TiArrowSortedUp /> : <TiArrowSortedDown /> : ''}
      </p>
    </div>
  );
};
