import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Brush } from 'recharts';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './StackedMixBarChart.module.scss';
import { useAppSelector } from '../../redux/store';
import { depDashSelector } from '../../redux/features/depDash/selectors';
import { Status } from '../../redux/mainTypes';
import { filterSelector } from '../../redux/features/filter/selectors';
import { ToggleCustom } from '..';

const data = [
  {
    name: 'Finances',
    prevOk: 13,
    prevGood: 7,
    prevPerfect: 20,

    curOk: 45,
    curGood: 90
  },
  {
    name: 'Finances',
    prevOk: 13,
    prevGood: 7,
    prevPerfect: 20,

    curOk: 45,
    curGood: 90
  },
  {
    name: 'Finances',
    prevOk: 13,
    prevGood: 7,
    prevPerfect: 20,

    curOk: 45,
    curGood: 90
  },
  {
    name: 'Finances',
    prevOk: 13,
    prevGood: 7,
    prevPerfect: 20,

    curOk: 45,
    curGood: 90
  },
  {
    name: 'Finances',
    prevOk: 13,
    prevGood: 7,
    prevPerfect: 20,

    curOk: 45,
    curGood: 90
  },
  {
    name: 'Finances',
    prevOk: 13,
    prevGood: 7,
    prevPerfect: 20,

    curOk: 45,
    curGood: 90
  },
  {
    name: 'Finances',
    prevOk: 13,
    prevGood: 7,
    prevPerfect: 20,

    curOk: 45,
    curGood: 90
  }
];

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

export const StackedMixBarChart: React.FC = () => {
  const { depStackedMixedBar, status } = useAppSelector(depDashSelector);
  const { department, position } = useAppSelector(filterSelector);
  const [isToggled, setIsToggled] = useState(false);

  const onToggle = () => setIsToggled(!isToggled);

  const title = `Динамика развития навыков: ${
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
            {/* <Legend align="left" verticalAlign="middle" width={100} margin={{ right: 10 }} /> */}
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
