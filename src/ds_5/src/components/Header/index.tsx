import React from 'react';
import { UrlState } from 'bi-internal/core';
import { IoArrowBack } from 'react-icons/io5';

import styles from './Header.module.scss';

/**
 * Компонент Header представляет собой заголовок с навигацией для переключения между различными разделами приложения.
 *
 * - Включает кнопку "Назад" для возврата к предыдущему состоянию или странице.
 * - Содержит кнопки для переключения между различными "досками" (dboard), такими как "Сотрудник" и "Департамент".
 * - Отображает активную доску с выделением.
 */
export const Header: React.FC = () => {
  const { dboard } = UrlState.getModel();

  /**
   * Обработчик для переключения на выбранную "доску" (dboard).
   *
   * @param dboard - Идентификатор доски для навигации.
   */
  const onClickDboard = (dboard: string) => {
    UrlState.navigate({ dboard });
  };

  /**
   * Обработчик для возврата на предыдущую страницу или состояние.
   */
  const onClickBack = () => {
    UrlState.navigate({ path: ['ds'] });
  };

  return (
    <header className={styles.root}>
      <nav className={styles.root__nav}>
        <button className={styles.root__nav_back} onClick={onClickBack}>
          <IoArrowBack />
        </button>
        <div className={styles.root__dashboards}>
          <button
            className={`${styles.root__dashboards_btn} ${styles.root__dashboards_left}${
              dboard === '1' ? ' activated' : ''
            }`}
            onClick={() => onClickDboard('1')}
          >
            Сотрудник
          </button>
          <button
            className={`${styles.root__dashboards_btn} ${styles.root__dashboards_right}${
              dboard === '2' ? ' activated' : ''
            }`}
            onClick={() => onClickDboard('2')}
          >
            Департамент
          </button>
        </div>
      </nav>
    </header>
  );
};
