import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './StackedAreaChartCustom.module.scss';

const data = [
  {
    name: `Фин`,
    2023: 1,
    2024: 3
  },
  {
    name: `Фарм`,
    2023: 2,
    2024: 3
  },
  {
    name: `Строи`,
    2023: 1,
    2024: 3
  },
  {
    name: `Рекл`,
    2023: 2,
    2024: 3
  },
  {
    name: `Нефть`,
    2023: 2,
    2024: 2
  },
  {
    name: `Логист`,
    2023: 3,
    2024: 2
  }
];

const ticksLabels = { 0: '', 1: '1 ур.', 2: '2 ур.', 3: '3 ур.' };
const ticks = [0, 1, 2, 3];

export const StackedAreaChartCustom: React.FC = () => {
  return (
    <DashletLayout
      title={'Динамика улучшения знаний предметной области'}
      width={'calc((1vh + 1vw) * 19.0977)'}
      height={'calc((1vh + 1vw)* 6.007)'}
      className={styles.root}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" ticks={ticks} tick={CustomizedTick} />
          <Tooltip />
          <Area type="monotone" dataKey="2024" stroke="#E697FF" fill="#E697FF" />
          <Area type="monotone" dataKey="2023" stroke="#6DA7FF" fill="#6DA7FF" />
        </AreaChart>
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
