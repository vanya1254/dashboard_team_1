import React, { useEffect, useRef, useState } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './BarChartCustom.module.scss';
import { useAppSelector } from '../../redux/store';
import { empDashSelector } from '../../redux/features/empDash/selectors';
import { Status } from '../../redux/mainTypes';

const data = [
  {
    skill: 'SQL',
    2022: 1,
    2023: 3
  },
  {
    skill: 'JS',
    2022: 2,
    2023: 2
  },
  {
    skill: 'HTML',
    2022: 3,
    2023: 3
  },
  {
    skill: 'PYTHON',
    2022: 3,
    2023: 4
  },
  {
    skill: 'C++',
    2022: 0,
    2023: 1
  }
];

const ticksLabels = { 0: '', 1: 'Novice', 2: 'Junior', 3: 'Middle', 4: 'Senior', 5: 'Expert' };
const ticks = [0, 1, 2, 3, 4, 5];

export const BarChartCustom: React.FC = () => {
  const { empBar, status } = useAppSelector(empDashSelector);

  return (
    <DashletLayout
      title="Динамика развития навыка сотрудника"
      width={'calc((1vh + 1vw) * 39.2019)'}
      height={'calc((1vh + 1vw) * 6.007)'}
      className={styles.root}
    >
      {status === Status.Fulfilled ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={empBar} barGap={0}>
            <XAxis dataKey="skill" stroke="#fff" />
            <YAxis ticks={ticks} tick={CustomizedTick} stroke="#fff" />
            <Tooltip />
            <Bar dataKey="2022" fill="#6DA7FF" />
            <Bar dataKey="2023" fill="#ef8eff" />
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

const CustomizedTick = (props) => {
  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={2}
        fill="#fff"
        textAnchor="end"
        // fontFamily="sans-serif"
      >
        {ticksLabels[payload.value]}
      </text>
    </g>
  );
};
