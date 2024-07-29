import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';

import { useAppSelector } from '../../redux/store';
import { depDashSelector } from '../../redux/features/depDash/selectors';

import { Status } from '../../redux/mainTypes';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './SimpleAreaChartCustom.module.scss';
import { SKILL_LEVEL } from '../../constants';
import { filterSelector } from '../../redux/features/filter/selectors';

const data = [
  {
    name: `Фин`,
    value: 20
  },
  {
    name: `Фарм`,
    value: 40
  },
  {
    name: `Строи`,
    value: 25
  },
  {
    name: `Рекл`,
    value: 28
  },
  {
    name: `Нефть`,
    value: 10
  },
  {
    name: `Логист`,
    value: 40
  }
];

export const SimpleAreaChartCustom: React.FC = () => {
  const { depSimpleArea, status } = useAppSelector(depDashSelector);
  const { department, position } = useAppSelector(filterSelector);

  const title = `Средний уровень навыка: ${
    department[1] || position[1] ? `${department[1] || ''} ${position[1] || ''}` : 'ДАР'
  }`;

  return (
    <DashletLayout title={title} width={'100%'} height={'calc((1vh + 1vw) * 9.375)'} className={styles.root}>
      {status === Status.Fulfilled ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={depSimpleArea}>
            <XAxis dataKey="skill_name" stroke="#fff" />
            <YAxis
              stroke="#fff"
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tickFormatter={(tick) => SKILL_LEVEL[tick]}
            />
            <Tooltip
              formatter={(level, name) => {
                return [`${level.toFixed(1)}`, 'Average'];
              }}
            />
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#ccc" />
            <Brush
              dataKey="skill_name"
              height={20}
              stroke="#8da5d6"
              fill="#fff"
              strokeOpacity={0.8}
              travellerWidth={12}
            />
            <Area type="monotone" dataKey="current_skill_level" stroke="#E697FF" fill="#E697FF" fillOpacity={1} />
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
