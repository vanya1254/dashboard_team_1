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
  { skill: 'databases', level: 1, midLevel: 3 },
  { skill: 'tools', level: 1, midLevel: 3 },
  { skill: 'platforms', level: 2, midLevel: 2 },
  { skill: 'spheres', level: 3, midLevel: 3 },
  { skill: 'technologies', level: 4, midLevel: 4 },
  { skill: 'types system', level: 3, midLevel: 1 },
  { skill: 'frameworks', level: 0, midLevel: 3 },
  { skill: 'languages', level: 2, midLevel: 3 }
];

export const RadarChartCustom: React.FC = () => {
  return (
    <DashletLayout
      title="Характеристика сотрудника"
      // width={'571px'}
      // height={'460px'}
      // width={'100%'}
      width={'calc((1vh + 1vw)* 19.8269)'}
      height={'calc((1vh + 1vw)* 15.9727)'}
      className={styles.root}
    >
      <ResponsiveContainer className={styles.root__chart} width="100%" height="100%">
        <RadarChart style={{ fill: '#fff' }} outerRadius={'90%'} data={data}>
          <PolarAngleAxis dataKey="skill" />
          <PolarGrid />
          <Radar dataKey="midLevel" stroke="#6DA7FF" fill="#6DA7FF" fillOpacity={0.6} />
          <Radar dataKey="level" stroke="#ef8eff" fill="#ef8eff" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </DashletLayout>
  );
};
