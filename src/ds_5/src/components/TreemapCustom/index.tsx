import React from 'react';
import { ResponsiveContainer, Treemap } from 'recharts';

import styles from './TreemapCustom.module.scss';
import { DashletLayout } from '../../layouts/DashletLayout';

const data = [
  {
    name: 'Направление СКИМ',
    size: 6
  },
  {
    name: 'KeepRise',
    size: 5
  },
  {
    name: 'Направление DG&GQ',
    size: 4
  },
  {
    name: 'Направление BI',
    size: 3
  },
  {
    name: 'Группа СА РЖД',
    size: 2
  },
  {
    name: 'Направление DWH&ML',
    size: 1
  }
];

export const TreemapCustom: React.FC = () => {
  return (
    <DashletLayout className={styles.root} title={'Самые развитые подразделенеия'} width={'100%'} height={'270px'}>
      <ResponsiveContainer className={styles.root__chart} width="100%" height="100%">
        <Treemap data={data} dataKey="size" aspectRatio={4 / 3} stroke="#fff" fill="#EF8EFF" />
      </ResponsiveContainer>
    </DashletLayout>
  );
};
