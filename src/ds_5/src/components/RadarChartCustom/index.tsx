import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './RadarCharCustom.module.scss';
import { useAppSelector } from '../../redux/store';
import { empDashSelector } from '../../redux/features/empDash/selectors';
import { Status } from '../../redux/mainTypes';
import { SKILL_LEVEL } from '../../constants';

const data = [
  { skill_type: 'Базы данных', level: 0, midLevel: 0 },
  { skill_type: 'Инструменты', level: 2, midLevel: 3 },
  { skill_type: 'Платформы', level: 2, midLevel: 3 },
  { skill_type: 'Среды разработки', level: 0, midLevel: 0 },
  { skill_type: 'Технологии', level: 3, midLevel: 2 },
  { skill_type: 'Типы систем', level: 0, midLevel: 0 },
  { skill_type: 'Фреймворки', level: 0, midLevel: 0 },
  { skill_type: 'Языки программировния', level: 3, midLevel: 3 }
];

export const RadarChartCustom: React.FC = () => {
  const { empRadar, status } = useAppSelector(empDashSelector);

  return (
    <DashletLayout
      title="Характеристика сотрудника"
      width={'calc((1vh + 1vw)* 19.8269)'}
      height={'calc((1vh + 1vw)* 15.9727)'}
      className={styles.root}
    >
      {status === Status.Fulfilled ? (
        <ResponsiveContainer className={styles.root__chart} width="100%" height="100%">
          <RadarChart style={{ fill: '#fff' }} outerRadius={'90%'} data={empRadar}>
            <PolarAngleAxis dataKey="skill_type" />
            <PolarRadiusAxis
              domain={[0, 5]}
              scale="linear"
              tickCount={6}
              tickFormatter={(tick) => SKILL_LEVEL[tick]}
              angle={70}
              axisLine={false}
            />
            <PolarGrid />
            <Radar dataKey="midLevel" stroke="#6DA7FF" fill="#6DA7FF" fillOpacity={0.6} />
            <Radar dataKey="level" stroke="#ef8eff" fill="#ef8eff" fillOpacity={0.6} />
            <Tooltip
              formatter={(value, name) => {
                if (name === 'midLevel') return [`${value}`, 'Средний по должности'];
                if (name === 'level') return [`${value}`, 'По сотруднику'];
                return value;
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      ) : status === Status.Pending ? (
        'LOADING'
      ) : (
        'ERROR'
      )}
    </DashletLayout>
  );
};
