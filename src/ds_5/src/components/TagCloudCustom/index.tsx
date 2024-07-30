import React from 'react';
import { TagCloud } from 'react-tagcloud';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './TagCloudCustom.module.scss';
import { useAppSelector } from '../../redux/store';
import { depDashSelector } from '../../redux/features/depDash/selectors';
import { Status } from '../../redux/mainTypes';

const data = [
  {
    value: 'Направление СКИМ',
    count: 6
  },
  {
    value: 'KeepRise',
    count: 5
  },
  {
    value: 'Направление DG&GQ',
    count: 4
  },
  {
    value: 'Направление BI',
    count: 3
  },
  {
    value: 'Группа СА РЖД',
    count: 2
  },
  {
    value: 'Направление DWH&ML',
    count: 1
  }
];

const colors = {
  blue: '#6DA7FF',
  purple: '#8842B4',
  orange: '#E29076',
  green: '#58C5BE'
};

export const TagCloudCustom: React.FC = () => {
  const { depTagCloud, status } = useAppSelector(depDashSelector);

  return (
    <DashletLayout
      className={`${styles.root} scroller`}
      title={'Самые развитые подразделения'}
      width={'100%'}
      height={'calc((1vh + 1vw) * 9.375)'}
    >
      {status === Status.Fulfilled ? (
        <TagCloud
          minSize={12}
          maxSize={48}
          shuffle={true}
          tags={depTagCloud}
          colorOptions={colors}
          className={`simple-cloud ${styles.root__chart}`}
          renderer={customRenderer}
        />
      ) : status === Status.Pending ? (
        'Загрузка...'
      ) : status === Status.Rejected ? (
        'Ошибка('
      ) : (
        'Нет данных'
      )}
    </DashletLayout>
  );
};

const customRenderer = (tag, size, color) => (
  <span
    key={tag.value}
    style={{
      animation: 'blinker 3s linear infinite',
      animationDelay: `${Math.random() * 2}s`,
      color: color,
      fontSize: `${size}px`
    }}
  >
    {tag.value}
  </span>
);
