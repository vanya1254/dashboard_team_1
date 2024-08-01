import React from 'react';

import { useAppSelector } from '../../redux/store';
import { empDashSelector } from '../../redux/features/empDash/selectors';

import { Status } from '../../redux/mainTypes';

import styles from './EmployeeCard.module.scss';

/**
 * Компонент EmployeeCard отображает карточку сотрудника с его изображением и основной информацией.
 *
 * - Включает две основные секции: левая с изображением и основными данными, правая с дополнительной информацией.
 * - Использует данные из глобального состояния через селектор empDashSelector.
 * - В зависимости от состояния загрузки отображает соответствующие сообщения или данные.
 */
export const EmployeeCard: React.FC = () => {
  const { employee, empCard, status } = useAppSelector(empDashSelector);

  return (
    <section className={`${styles.root} scroller`}>
      <div className={styles.root__left}>
        <div className={styles.root__img}>
          {/* Отображение изображения сотрудника */}
          <img src={employee.picture_url} alt="employee image" />
        </div>
        <div className={styles.root__info}>
          <ul>
            {/* Отображение первых трех элементов информации сотрудника, если они доступны */}
            {status === Status.Fulfilled
              ? empCard.map((info, i) =>
                  i < 3 && info.value.length ? (
                    <li key={i}>
                      <h4>{info.skill_type}:</h4>
                      <p>{info.value.join(', ')}</p>
                    </li>
                  ) : (
                    ''
                  )
                )
              : status === Status.Pending
              ? 'Загрузка...'
              : status === Status.Rejected
              ? 'Ошибка('
              : 'Нет данных'}
          </ul>
        </div>
      </div>
      <div className={`${styles.root__info} ${styles.root__right}`}>
        <ul>
          {/* Отображение оставшихся элементов информации сотрудника, если они доступны */}
          {status === Status.Fulfilled
            ? empCard.map((info, i) =>
                i >= 3 && info.value.length ? (
                  <li key={i}>
                    <h4>{info.skill_type}:</h4>
                    <p>{info.value.join(', ')}</p>
                  </li>
                ) : (
                  ''
                )
              )
            : status === Status.Pending
            ? 'Загрузка...'
            : status === Status.Rejected
            ? 'Ошибка('
            : 'Нет данных'}
        </ul>
      </div>
    </section>
  );
};
