import React, { useEffect, useRef, useState } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

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
    <div className={styles.root}>
      <div style={{ width: '1129px', height: `263px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={data}>
            <XAxis dataKey="skill" />
            <YAxis ticks={ticks} tick={CustomizedTick} />
            <Tooltip />
            <Bar dataKey="prev" fill="#82ca9d" />
            <Bar dataKey="cur" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomizedTick = (props) => {
  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={2} fill="#666" textAnchor="end">
        {ticksLabels[payload.value]}
      </text>
    </g>
  );
};
