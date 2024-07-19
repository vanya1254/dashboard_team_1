import React from 'react';
import { ResponsiveContainer, Treemap } from 'recharts';
import { TagCloud } from 'react-tagcloud';

import styles from './TreemapCustom.module.scss';
import { DashletLayout } from '../../layouts/DashletLayout';

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

export const TreemapCustom: React.FC = () => {
  return (
    <DashletLayout
      className={styles.root}
      title={'Самые развитые подразделенеия'}
      width={'100%'}
      height={'calc((1vh + 1vw) * 9.375)'}
    >
      {/* <ResponsiveContainer className={styles.root__chart} width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#EF8EFF"
          isAnimationActive={false}
        />
      </ResponsiveContainer> */}
      <TagCloud minSize={14} maxSize={48} tags={data} className={styles.root__chart} />
    </DashletLayout>
  );
};
