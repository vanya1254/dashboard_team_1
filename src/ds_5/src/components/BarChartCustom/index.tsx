import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, Brush, CartesianGrid } from 'recharts';

import { useAppSelector } from '../../redux/store';
import { empDashSelector } from '../../redux/features/empDash/selectors';

import { Status } from '../../redux/mainTypes';

import { SKILL_LEVEL } from '../../constants';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './BarChartCustom.module.scss';

export const BarChartCustom: React.FC = () => {
  const { empBar, status } = useAppSelector(empDashSelector);

  return (
    <DashletLayout
      title="Динамика развития навыка сотрудника"
      width={'100%'}
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
