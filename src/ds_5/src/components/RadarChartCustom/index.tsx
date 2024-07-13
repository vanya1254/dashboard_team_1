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

import './RadarCharCustom.scss';

const data = [
  { skill: 'databases', level: 89, fullMark: 100 },
  { skill: 'tools', level: 55, fullMark: 100 },
  { skill: 'platforms', level: 77, fullMark: 100 },
  { skill: 'spheres', level: 100, fullMark: 100 },
  { skill: 'technologies', level: 89, fullMark: 100 },
  { skill: 'types system', level: 55, fullMark: 100 },
  { skill: 'frameworks', level: 55, fullMark: 100 },
  { skill: 'languages', level: 55, fullMark: 100 }
];

export const RadarChartCustom: React.FC = () => {
  return (
    <div className="radar" style={{ width: '700px', height: '700px' }}>
      {/* <h2 className={styles.root_title}>Характеристика сотрудника</h2> */}
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius={90} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <Radar dataKey="level" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          {/* <Legend /> */}
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
