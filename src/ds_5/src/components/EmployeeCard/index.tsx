import React from 'react';

import { useAppSelector } from '../../redux/store';
import { empDashSelector } from '../../redux/features/empDash/selectors';
import { Status } from '../../redux/mainTypes';

import styles from './EmployeeCard.module.scss';

const data = [
  { label: 'ФИО', value: 'Иван Иванов' },
  { label: 'Образование', value: ['Высшее'] },
  { label: 'Иностранные языки', value: ['Английский', 'Немецкий'] },
  { label: 'Инструменты', value: ['VS Code', 'Git'] },
  { label: 'Опыт в отрасли', value: ['5 лет'] },
  { label: 'Платформы', value: ['Windows', 'Linux'] },
  { label: 'Опыт сотрудника в предметной области', value: ['Веб-разработка'] },
  { label: 'Среды разработки', value: ['Eclipse', 'IntelliJ IDEA'] },
  { label: 'Фреймворки', value: ['React', 'Next.js', 'Redux'] },
  { label: 'Языки программирования', value: ['JavaScript', 'Python', 'Java'] },
  { label: 'Технологии', value: ['HTML', 'SCSS'] }
];

export const EmployeeCard: React.FC = () => {
  const { employee, empCard, status } = useAppSelector(empDashSelector);

  return (
    <section className={`${styles.root} scroller`}>
      <div className={styles.root__left}>
        <div className={styles.root__img}>
          <img src={employee.picture_url} alt="employee image" />
        </div>
        <div className={styles.root__info}>
          <ul>
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
