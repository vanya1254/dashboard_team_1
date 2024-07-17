import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './StackedMixBarChart.module.scss';

const data = [
  {
    name: 'Finances',
    prevOk: 13,
    prevGood: 7,
    prevPerfect: 20,

    curOk: 45,
    curGood: 90
  },
  {
    name: 'Finances',
    prevOk: 13,
    prevGood: 7,
    prevPerfect: 20,

    curOk: 45,
    curGood: 90
  },
  {
    name: 'Finances',
    prevOk: 13,
    prevGood: 7,
    prevPerfect: 20,

    curOk: 45,
    curGood: 90
  },
  {
    name: 'Finances',
    prevOk: 13,
    prevGood: 7,
    prevPerfect: 20,

    curOk: 45,
    curGood: 90
  },
  {
    name: 'Finances',
    prevOk: 13,
    prevGood: 7,
    prevPerfect: 20,

    curOk: 45,
    curGood: 90
  },
  {
    name: 'Finances',
    prevOk: 13,
    prevGood: 7,
    prevPerfect: 20,

    curOk: 45,
    curGood: 90
  },
  {
    name: 'Finances',
    prevOk: 13,
    prevGood: 7,
    prevPerfect: 20,

    curOk: 45,
    curGood: 90
  }
];

export const StackedMixBarChart: React.FC = () => {
  return (
    <DashletLayout className={styles.root} title={'Динамика развития навыков в ДАР'} width={'100%'} height={'270px'}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart margin={{ left: 100 }} width={500} height={300} data={data}>
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" tick={() => null} />
          <Tooltip />
          <Legend align="left" verticalAlign="middle" width={100} margin={{ right: 10 }} />
          <Bar dataKey="prevOk" stackId="2023" fill="#8842B4" />
          <Bar dataKey="prevGood" stackId="2023" fill="#E29076" />
          <Bar dataKey="prevPerfect" stackId="2023" fill="#58C5BE" />

          <Bar dataKey="curOk" stackId="2024" fill="#8842B4" />
          <Bar dataKey="curGood" stackId="2024" fill="#E29076" />
          <Bar dataKey="curPerfect" stackId="2024" fill="#58C5BE" />
        </BarChart>
      </ResponsiveContainer>
    </DashletLayout>
  );
};
