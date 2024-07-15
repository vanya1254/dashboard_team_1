import React from 'react';

import employee from '../../img/employee.png';

import styles from './EmployeeCard.module.scss';

const data = [
  { label: 'ФИО', value: 'Иван Иванов' },
  { label: 'Должность', value: ['Разработчик'] },
  { label: 'Подразделение', value: ['Отдел разработки'] },
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
  return (
    <section className={styles.root}>
      <div>
        <div>{/* <img src={employee} alt="employee image" /> */}</div>
        <div>
          <ul>{data.map((info, i) => (i < 5 ? <li key={i}>{info.label}</li> : ''))}</ul>
        </div>
      </div>
      <div>
        <ul>{data.map((info, i) => (i < 5 ? <li key={i}>{info.label}</li> : ''))}</ul>
      </div>
    </section>
  );
};
