import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './SimpleAreaChartCustom.module.scss';

const data = [
  {
    name: 'Page A',
    value: 20
  },
  {
    name: 'Page B',
    value: 35
  },
  {
    name: 'Page C',
    value: 45
  },
  {
    name: 'Page D',
    value: 23
  },
  {
    name: 'Page E',
    value: 10
  },
  {
    name: 'Page F',
    value: 40
  }
];

export const SimpleAreaChartCustom: React.FC = () => {
  return (
    <DashletLayout
      title={'Самый развитый навык в целом по ДАР'}
      width={'100%'}
      height={'270px'}
      className={styles.root}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#E697FF" fill="#E697FF" />
        </AreaChart>
      </ResponsiveContainer>
    </DashletLayout>
  );
};
