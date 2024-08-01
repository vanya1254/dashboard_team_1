import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts';

import { useAppSelector } from '../../redux/store';
import { empDashSelector } from '../../redux/features/empDash/selectors';

import { Status } from '../../redux/mainTypes';

import { SKILL_LEVEL } from '../../constants';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './RadarCharCustom.module.scss';

/**
 * Компонент RadarChartCustom отображает радарную диаграмму, представляющую характеристики сотрудника.
 * Использует библиотеку recharts для визуализации данных.
 *
 * - Иконки: FaArrowUpRightDots для новых навыков за год, BsClipboard2Check для годового темпа.
 * - Отображает состояние загрузки данных (Загрузка, Ошибка, Нет данных).
 */
export const RadarChartCustom: React.FC = () => {
  const { empRadar, status } = useAppSelector(empDashSelector);

  return (
    <DashletLayout
      title="Характеристика сотрудника"
      width={'100%'}
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
            <Radar dataKey="midDepLevel" stroke="#6DA7FF" fill="#6DA7FF" fillOpacity={0.6} />
            <Radar dataKey="midPosLevel" stroke="#E29076" fill="#E29076" fillOpacity={0.6} />
            <Radar dataKey="level" stroke="#ef8eff" fill="#ef8eff" fillOpacity={0.6} />
            <Tooltip
              formatter={(value, name) => {
                value = value.toFixed(2);

                if (name === 'midDepLevel') return [`${value}`, 'Средний балл по департаменту'];
                if (name === 'midPosLevel') return [`${value}`, 'Средний балл по должности'];
                if (name === 'level') return [`${value}`, 'По сотруднику'];
                return value;
              }}
            />
          </RadarChart>
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
