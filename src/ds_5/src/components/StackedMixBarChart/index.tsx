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
            <Bar dataKey="prev_count_novice_department" stackId="2022" fill="#8842B4" />
            <Bar dataKey="prev_count_junior_department" stackId="2022" fill="#E29076" />
            <Bar dataKey="prev_count_middle_department" stackId="2022" fill="#58C5BE" />
            <Bar dataKey="prev_count_senior_department" stackId="2022" fill="#8842B4" />
            <Bar dataKey="prev_count_expert_department" stackId="2022" fill="#E29076" />

            <Bar dataKey="cur_count_novice_department" stackId="2023" fill="#8842B4" />
            <Bar dataKey="cur_count_junior_department" stackId="2023" fill="#E29076" />
            <Bar dataKey="cur_count_middle_department" stackId="2023" fill="#58C5BE" />
            <Bar dataKey="cur_count_senior_department" stackId="2023" fill="#8842B4" />
            <Bar dataKey="cur_count_expert_department" stackId="2023" fill="#E29076" />
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
