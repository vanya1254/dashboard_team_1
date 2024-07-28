import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Brush } from 'recharts';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './StackedMixBarChart.module.scss';
import { useAppSelector } from '../../redux/store';
import { depDashSelector } from '../../redux/features/depDash/selectors';
import { Status } from '../../redux/mainTypes';

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
  const { depStackedMixedBar, status } = useAppSelector(depDashSelector);

  return (
    <DashletLayout
      className={styles.root}
      title={'Динамика развития навыков в ДАР'}
      width={'100%'}
      height={'calc((1vh + 1vw) * 9.375)'}
    >
      {status === Status.Fulfilled ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={depStackedMixedBar} barGap={0}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" tick={() => null} />
            <Tooltip />
            <Brush dataKey="name" height={20} stroke="#8da5d6" fill="#fff" strokeOpacity={0.8} travellerWidth={12} />
            {/* <Legend align="left" verticalAlign="middle" width={100} margin={{ right: 10 }} /> */}
            <Bar dataKey="prevNovice" stackId="2022" fill="#8842B4" />
            <Bar dataKey="prevJunior" stackId="2022" fill="#E29076" />
            <Bar dataKey="prevMiddle" stackId="2022" fill="#58C5BE" />
            <Bar dataKey="prevSenior" stackId="2022" fill="#8842B4" />
            <Bar dataKey="prevExpert" stackId="2022" fill="#E29076" />

            <Bar dataKey="curNovice" stackId="2023" fill="#8842B4" />
            <Bar dataKey="curJunior" stackId="2023" fill="#E29076" />
            <Bar dataKey="curMiddle" stackId="2023" fill="#58C5BE" />
            <Bar dataKey="curSenior" stackId="2023" fill="#8842B4" />
            <Bar dataKey="curExpert" stackId="2023" fill="#E29076" />
          </BarChart>
        </ResponsiveContainer>
      ) : status === Status.Pending ? (
        'LOADING'
      ) : (
        ''
      )}
    </DashletLayout>
  );
};
