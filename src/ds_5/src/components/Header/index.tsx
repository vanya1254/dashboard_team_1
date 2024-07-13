import React from 'react';
import { UrlState } from 'bi-internal/core';
import { IoArrowBack } from 'react-icons/io5';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { dboard } = UrlState.getModel();

  const onClickDboard = (dboard: string) => {
    UrlState.navigate({ dboard });
  };

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
            className={`${styles.root__dashboards_btn}${dboard === '1' ? ' active' : ''}`}
            onClick={() => onClickDboard('1')}
          >
            Сотрудник
          </button>
          <button
            className={`${styles.root__dashboards_btn}${dboard === '2' ? ' active' : ''}`}
            onClick={() => onClickDboard('2')}
          >
            Департамент
          </button>
        </div>
      </nav>
    </header>
  );
};
