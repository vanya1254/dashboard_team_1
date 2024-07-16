import React, { useEffect, useRef, useState } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './BarChartCustom.module.scss';

const data = [
  {
    skill: 'SQL',
    prev: 33,
    cur: 55
  },
  {
    skill: 'JS',
    prev: 33,
    cur: 55
  },
  {
    skill: 'HTML',
    prev: 33,
    cur: 55
  },
  {
    skill: 'PYTHON',
    prev: 33,
    cur: 55
  },
  {
    skill: 'C++',
    prev: 33,
    cur: 55
  }
];

const ticksLabels = { 0: 'Novice', 25: 'Junior', 50: 'Middle', 75: 'Senior', 100: 'Expert' };
const ticks = [0, 25, 50, 75, 100];

export const BarChartCustom: React.FC = () => {
  return (
    <DashletLayout
      title="Динамика развития навыка сотрудника"
      // width={'1129px'}
      // height={'173px'}
      width={'calc((1vh + 1vw) * 39.2019)'}
      height={'calc((1vh + 1vw) * 6.007)'}
      className={styles.root}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="skill" stroke="#fff" />
          <YAxis ticks={ticks} tick={CustomizedTick} stroke="#fff" />
          <Tooltip />
          <Bar dataKey="prev" fill="#6DA7FF" />
          <Bar dataKey="cur" fill="#ef8eff" />
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
