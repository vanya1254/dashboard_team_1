import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Brush } from 'recharts';

import { useAppSelector } from '../../redux/store';
import { depDashSelector } from '../../redux/features/depDash/selectors';
import { filterSelector } from '../../redux/features/filter/selectors';

import { Status } from '../../redux/mainTypes';

import { ToggleCustom } from '..';
import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './StackedMixBarChart.module.scss';

// Маппинг для тултипов
const tooltipTicks = {
  prev_count_expert_department: 'Experts 2022',
  prev_count_junior_department: 'Juniors 2022',
  prev_count_middle_department: 'Middles 2022',
  prev_count_novice_department: 'Novices 2022',
  prev_count_senior_department: 'Seniors 2022',
  cur_count_expert_department: 'Experts 2023',
  cur_count_junior_department: 'Juniors 2023',
  cur_count_middle_department: 'Middles 2023',
  cur_count_novice_department: 'Novices 2023',
  cur_count_senior_department: 'Seniors 2023'
};

/**
 * Компонент StackedMixBarChart отображает комбинированный график баров для уровня навыков по годам.
 *
 * Включает:
 * - Тогглер (`ToggleCustom`) для переключения между отображением новых и всех навыков.
 * - График столбцов с данными по уровням навыков за 2022 и 2023 годы.
 * - Использует данные из Redux store через селекторы `depDashSelector` и `filterSelector`.
 * - Отображает информацию в зависимости от состояния загрузки данных (Fulfilled, Pending, Rejected, No Data).
 *
 * Внутреннее состояние:
 * - `isToggled`: флаг, указывающий, выбран ли режим отображения всех навыков (true) или новых навыков (false).
 *
 * Маппинг данных:
 * - `tooltipTicks`: описание для каждого уровня навыка, отображаемое в тултипе.
 */
export const StackedMixBarChart: React.FC = () => {
  const { depStackedMixedBar, status } = useAppSelector(depDashSelector);
  const { department, position } = useAppSelector(filterSelector);
  const [isToggled, setIsToggled] = useState(false);

  const onToggle = () => setIsToggled(!isToggled);

  const title = `${isToggled ? 'Всего навыков' : 'Новых навыков'}: ${
    department[1] || position[1] ? `${department[1] || ''} ${position[1] || ''}` : 'ДАР'
  }`;

  return (
    <DashletLayout className={styles.root} title={title} width={'100%'} height={'calc((1vh + 1vw) * 9.375)'}>
      <div className={styles.root__toggleContainer}>
        <ToggleCustom isToggled={isToggled} onToggle={onToggle} />
      </div>
      {status === Status.Fulfilled ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={depStackedMixedBar[isToggled ? 1 : 0]} barGap={0}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip formatter={(value, name) => (value ? [`${value}`, tooltipTicks[name]] : [])} />
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#ccc" />
            <Brush dataKey="name" height={20} stroke="#8da5d6" fill="#fff" strokeOpacity={0.8} travellerWidth={12} />
            {/* Столбцы для каждого уровня навыка по годам */}
            <Bar dataKey="prev_count_novice_department" stackId="2022" fill="#8842B4" />
            <Bar dataKey="prev_count_junior_department" stackId="2022" fill="#b56995" />
            <Bar dataKey="prev_count_middle_department" stackId="2022" fill="#E29076" />
            <Bar dataKey="prev_count_senior_department" stackId="2022" fill="#9dab9a" />
            <Bar dataKey="prev_count_expert_department" stackId="2022" fill="#58C5BE" />
            <Bar dataKey="cur_count_novice_department" stackId="2023" fill="#8842B4" />
            <Bar dataKey="cur_count_junior_department" stackId="2023" fill="#b56995" />
            <Bar dataKey="cur_count_middle_department" stackId="2023" fill="#E29076" />
            <Bar dataKey="cur_count_senior_department" stackId="2023" fill="#9dab9a" />
            <Bar dataKey="cur_count_expert_department" stackId="2023" fill="#58C5BE" />
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
