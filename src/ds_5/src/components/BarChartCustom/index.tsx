import React, { useEffect, useRef, useState } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Brush, CartesianGrid } from 'recharts';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './BarChartCustom.module.scss';
import { useAppSelector } from '../../redux/store';
import { empDashSelector } from '../../redux/features/empDash/selectors';
import { Status } from '../../redux/mainTypes';
import { SKILL_LEVEL } from '../../constants';

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
      width={'100%'}
      // width={'calc((1vh + 1vw) * 39.2019)'}
      height={'calc((1vh + 1vw) * 6.007)'}
      className={styles.root}
    >
      {status === Status.Fulfilled ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={empBar} barGap={0}>
            <XAxis dataKey="skill" stroke="#fff" />
            <YAxis domain={[0, 5]} tickCount={6} tickFormatter={(tick) => SKILL_LEVEL[tick]} stroke="#fff" />
            <Tooltip formatter={(tick) => SKILL_LEVEL[tick]} />
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#ccc" />
            <Bar dataKey="2022" fill="#6DA7FF" />
            <Bar dataKey="2023" fill="#ef8eff" />
            <Brush dataKey="skill" height={20} stroke="#8da5d6" fill="#fff" strokeOpacity={0.8} travellerWidth={12} />
          </BarChart>
        </ResponsiveContainer>
      ) : status === Status.Pending ? (
        'Загрузка...'
      ) : status === Status.Rejected ? (
        'Ошибка('
      ) : (
        'Нет данных'
      )}
    </DashletLayout>
  );
};
