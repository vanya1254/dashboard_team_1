import React from 'react';

import styles from './ToggleCustom.module.scss';

// Типы для свойств компонента ToggleCustom
type ToggleCustomPropsT = {
  isToggled: boolean; // Состояние переключателя (включен/выключен)
  onToggle: () => void; // Функция обратного вызова для обработки переключения
};

/**
 * Компонент ToggleCustom представляет собой кастомный переключатель (toggle switch).
 *
 * Используется для управления состоянием включения/выключения с визуальным представлением.
 *
 * @param isToggled Текущее состояние переключателя (включен/выключен).
 * @param onToggle Функция обратного вызова для обработки изменений состояния переключателя.
 */
export const ToggleCustom: React.FC<ToggleCustomPropsT> = ({ isToggled, onToggle }) => {
  return (
    <label className={styles.root}>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={styles.root_switch} />
    </label>
  );
};
