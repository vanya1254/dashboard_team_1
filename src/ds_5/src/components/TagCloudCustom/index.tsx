import React from 'react';
import { TagCloud } from 'react-tagcloud';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './TagCloudCustom.module.scss';

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
  return (
    <DashletLayout
      className={styles.root}
      title={'Самые развитые подразделенеия'}
      width={'100%'}
      height={'calc((1vh + 1vw) * 9.375)'}
    >
      <TagCloud minSize={12} maxSize={48} tags={data} colorOptions={colors} className={styles.root__chart} />
    </DashletLayout>
  );
};
