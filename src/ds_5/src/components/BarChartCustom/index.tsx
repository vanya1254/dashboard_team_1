import React, { useEffect, useRef, useState } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './BarChartCustom.module.scss';

const data = [
  {
    skill: 'SQL',
    2023: 1,
    2024: 3
  },
  {
    skill: 'JS',
    2023: 2,
    2024: 2
  },
  {
    skill: 'HTML',
    2023: 3,
    2024: 3
  },
  {
    skill: 'PYTHON',
    2023: 3,
    2024: 4
  },
  {
    skill: 'C++',
    2023: 0,
    2024: 1
  }
];

const ticksLabels = { 0: 'Novice', 1: 'Junior', 2: 'Middle', 3: 'Senior', 4: 'Expert' };
const ticks = [0, 1, 2, 3, 4];

export const BarChartCustom: React.FC = () => {
  return (
    <DashletLayout
      title="Динамика развития навыка сотрудника"
      width={'calc((1vh + 1vw) * 39.2019)'}
      height={'calc((1vh + 1vw) * 6.007)'}
      className={styles.root}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="skill" stroke="#fff" />
          <YAxis ticks={ticks} tick={CustomizedTick} stroke="#fff" />
          <Tooltip />
          <Bar dataKey="2023" fill="#6DA7FF" />
          <Bar dataKey="2024" fill="#ef8eff" />
        </BarChart>
      </ResponsiveContainer>
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
