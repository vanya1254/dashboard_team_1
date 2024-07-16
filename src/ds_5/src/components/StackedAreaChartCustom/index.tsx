import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './StackedAreaChartCustom.module.scss';

const data = [
  {
    name: 'Page A',
    prev: 1,
    cur: 3
  },
  {
    name: 'Page B',
    prev: 2,
    cur: 3
  },
  {
    name: 'Page C',
    prev: 1,
    cur: 3
  },
  {
    name: 'Page D',
    prev: 2,
    cur: 3
  },
  {
    name: 'Page E',
    prev: 2,
    cur: 2
  },
  {
    name: 'Page F',
    prev: 3,
    cur: 2
  }
];

export const StackedAreaChartCustom: React.FC = () => {
  return (
    <DashletLayout
      title={'Динамика улучшения знаний предметной области'}
      // width={'550px'}
      // height={'173px'}
      width={'calc((1vh + 1vw) * 19.0977)'}
      height={'calc((1vh + 1vw)* 6.007)'}
      className={styles.root}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Area type="monotone" dataKey="prev" stroke="#6DA7FF" fill="#6DA7FF" />
          <Area type="monotone" dataKey="cur" stroke="#E697FF" fill="#E697FF" />
        </AreaChart>
      </ResponsiveContainer>
    </DashletLayout>
  );
};
