import React from 'react';
import { FaArrowUpRightDots } from 'react-icons/fa6';
import { BsClipboard2Check } from 'react-icons/bs';

import { DashletLayout } from '../../layouts/DashletLayout';
import { KpiBlock } from '..';

import styles from './KpiList.module.scss';

export const KpiList: React.FC = () => {
  return (
    <DashletLayout title="KPI" width={'100%'} height={'auto'} className={styles.root}>
      <KpiBlock icon={<FaArrowUpRightDots />} title={'Навыков за год'} value={26} isColored={false} />
      <KpiBlock icon={<BsClipboard2Check />} title={'Годовой темп'} value={3} isColored={true} />
    </DashletLayout>
  );
};
