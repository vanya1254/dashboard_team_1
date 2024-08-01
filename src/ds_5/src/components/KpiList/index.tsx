import React from 'react';
import { FaArrowUpRightDots } from 'react-icons/fa6';
import { BsClipboard2Check } from 'react-icons/bs';

import { useAppSelector } from '../../redux/store';
import { empDashSelector } from '../../redux/features/empDash/selectors';

import { Status } from '../../redux/mainTypes';

import { DashletLayout } from '../../layouts/DashletLayout';
import { KpiBlock } from '..';

import styles from './KpiList.module.scss';

/**
 * Компонент KpiList отображает список ключевых показателей эффективности (KPI) сотрудника.
 * Использует компонент KpiBlock для отображения отдельных KPI.
 *
 * - Иконки: FaArrowUpRightDots для новых навыков за год, BsClipboard2Check для годового темпа.
 * - Отображает состояние загрузки данных (Загрузка, Ошибка, Нет данных).
 */
export const KpiList: React.FC = () => {
  const { empKpi, status } = useAppSelector(empDashSelector);

  return (
    <DashletLayout title="KPI" width={'100%'} height={'auto'} className={styles.root}>
      {status === Status.Fulfilled && empKpi.length ? (
        <>
          <KpiBlock
            icon={<FaArrowUpRightDots />}
            title={'Навыков за год'}
            value={empKpi[0].new_skills_last}
            subValue={empKpi[0].new_skills_current}
            isColored={false}
          />
          <KpiBlock
            icon={<BsClipboard2Check />}
            title={'Годовой темп'}
            value={empKpi[0].improvement_percent}
            isColored={true}
          />
        </>
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
