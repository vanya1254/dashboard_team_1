import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';

import { useAppSelector } from '../../redux/store';
import { empDashSelector } from '../../redux/features/empDash/selectors';

import { Status } from '../../redux/mainTypes';

import { ToggleCustom } from '../ToggleCustom';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './StackedAreaChartCustom.module.scss';

// Маппинг значений для оси Y и тултипов
const ticksLabels = { 0: '', 1: '1 ур.', 2: '2 ур.', 3: '3 ур.' };
const titles = { false: 'отрасли', true: 'предметных областей' };
const tooltipTicks = {
  1: 'Знаком',
  2: `Знаком, могу применить`,
  3: `Знаком, могу реализовать`
};

/**
 * Компонент StackedAreaChartCustom отображает график накопительной площади для уровня знаний.
 *
 * Включает:
 * - Тогглер (`ToggleCustom`) для переключения между отображением данных по отраслям и предметным областям.
 * - График накопительной площади, который изменяется в зависимости от состояния тогглера.
 * - Использует данные из Redux store через селектор `empDashSelector`.
 * - Отображает информацию в зависимости от состояния загрузки данных (Fulfilled, Pending, Rejected, No Data).
 *
 * Внутреннее состояние:
 * - `isToggled`: флаг, указывающий, выбран ли режим отображения по предметным областям (true) или отраслям (false).
 *
 * Маппинг данных:
 * - `ticksLabels`: метки на оси Y, соответствующие уровням знаний.
 * - `titles`: заголовок графика в зависимости от состояния тогглера.
 * - `tooltipTicks`: описание уровней знаний для отображения в тултипе.
 */
export const StackedAreaChartCustom: React.FC = () => {
  const { empStackedArea, status } = useAppSelector(empDashSelector);
  const [isToggled, setIsToggled] = useState(false);

  const onToggle = () => setIsToggled(!isToggled);

  return (
    <DashletLayout
      title={`Уровень знаний ${titles[isToggled.toString()]}`}
      width={'100%'}
      height={'calc((1vh + 1vw)* 6.007)'}
      className={styles.root}
    >
      <div className={styles.root__toggleContainer}>
        <ToggleCustom isToggled={isToggled} onToggle={onToggle} />
      </div>
      {status === Status.Fulfilled ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={empStackedArea[isToggled ? 1 : 0]}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" domain={[0, 3]} tickCount={4} tickFormatter={(tick) => ticksLabels[tick]} />
            <Tooltip
              formatter={(level, name) => {
                return [`${tooltipTicks[level] || 'Нет опыта'}`];
              }}
            />
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#ccc" />
            <Area type="monotone" dataKey="level" stroke="#E697FF" fill="#E697FF" fillOpacity={1} />
            <Brush dataKey="name" height={20} stroke="#8da5d6" fill="#fff" strokeOpacity={0.8} travellerWidth={12} />
          </AreaChart>
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
