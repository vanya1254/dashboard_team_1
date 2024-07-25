import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './StackedAreaChartCustom.module.scss';
import { useAppSelector } from '../../redux/store';
import { empDashSelector } from '../../redux/features/empDash/selectors';
import { Status } from '../../redux/mainTypes';
import { ToggleCustom } from '../ToggleCustom';

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

const titles = { false: 'отрасли', true: 'предметных областей' };

export const StackedAreaChartCustom: React.FC = () => {
  const { empStackedArea, status } = useAppSelector(empDashSelector);
  const [isToggled, setIsToggled] = useState(false);

  const onToggle = () => setIsToggled(!isToggled);

  return (
    <DashletLayout
      title={`Уровень знаний ${titles[isToggled.toString()]}`}
      width={'calc((1vh + 1vw) * 19.0977)'}
      height={'calc((1vh + 1vw)* 6.007)'}
      className={styles.root}
    >
      <div className={styles.root__toggleContainer}>
        <ToggleCustom isToggled={isToggled} onToggle={onToggle} />
      </div>
      {status === Status.Fulfilled ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={empStackedArea[isToggled ? 0 : 1]}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" ticks={ticks} tick={CustomizedTick} />
            <Tooltip
              formatter={(level, name) => {
                return [`${level}`, 'Уровень владения'];
              }}
            />
            <Area type="monotone" dataKey="level" stroke="#E697FF" fill="#E697FF" fillOpacity={1} />
          </AreaChart>
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
