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

const data = [
  { skill: 'databases', level: 1, fullMark: 4 },
  { skill: 'tools', level: 1, fullMark: 4 },
  { skill: 'platforms', level: 2, fullMark: 4 },
  { skill: 'spheres', level: 3, fullMark: 4 },
  { skill: 'technologies', level: 4, fullMark: 4 },
  { skill: 'types system', level: 3, fullMark: 4 },
  { skill: 'frameworks', level: 0, fullMark: 4 },
  { skill: 'languages', level: 2, fullMark: 4 }
];

export const RadarChartCustom: React.FC = () => {
  return (
    <DashletLayout title="Характеристика сотрудника" width={'571px'} height={'464px'} className={styles.root}>
      <ResponsiveContainer className={styles.root__chart} width="100%" height="100%">
        <RadarChart style={{ fill: '#fff' }} outerRadius={'90%'} data={data}>
          <PolarAngleAxis dataKey="skill" />
          <PolarGrid />
          <Radar dataKey="level" stroke="#ef8eff" fill="#ef8eff" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </DashletLayout>
  );
};
