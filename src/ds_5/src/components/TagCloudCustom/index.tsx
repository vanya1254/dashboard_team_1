import React, { useState } from 'react';
import { TagCloud } from 'react-tagcloud';

import { useAppSelector } from '../../redux/store';
import { depDashSelector } from '../../redux/features/depDash/selectors';

import { Status } from '../../redux/mainTypes';

import { DashletLayout } from '../../layouts/DashletLayout';

import styles from './TagCloudCustom.module.scss';

// Цвета для тегов
const colors = {
  blue: '#6DA7FF',
  purple: '#8842B4',
  orange: '#E29076',
  green: '#58C5BE'
};

/**
 * Компонент TagCloudCustom отображает облако тегов, представляющее наиболее развитые подразделения.
 *
 * Использует данные из Redux store для получения информации о тегах и их статусе.
 *
 * Включает:
 * - Отображение облака тегов с возможностью кастомизации размера и цвета.
 * - Различные состояния загрузки данных (Fulfilled, Pending, Rejected, No Data).
 * - Кастомный рендерер для тегов с анимацией и отображением дополнительной информации в виде тултипа.
 */
export const TagCloudCustom: React.FC = () => {
  const { depTagCloud, status } = useAppSelector(depDashSelector);

  return (
    <DashletLayout
      className={`${styles.root} scroller`}
      title={'Самые развитые подразделения'}
      width={'100%'}
      height={'calc((1vh + 1vw) * 9.375)'}
    >
      {status === Status.Fulfilled ? (
        <TagCloud
          minSize={12}
          maxSize={48}
          shuffle={true}
          tags={depTagCloud}
          className={`simple-cloud ${styles.root__chart}`}
          renderer={customRenderer}
          colorOptions={colors}
        />
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

/**
 * Кастомный рендерер для тегов в облаке тегов.
 *
 * Отображает каждый тег с анимацией мигания, настраиваемым цветом и размером.
 * Также включает тултип с дополнительной информацией.
 *
 * @param tag Объект с данными тега (значение и количество).
 * @param size Размер шрифта для тега.
 * @param color Цвет тега.
 */
const customRenderer = (tag: { value: string; count: number }, size: number, color: string) => (
  <span
    key={tag.value}
    className={styles.root__chart_item}
    style={{
      animation: 'blinker 3s linear infinite',
      animationDelay: `${Math.random() * 2}s`,
      color: color,
      fontSize: `${size}px`
    }}
  >
    {tag.value}
    <span className={styles.root__tooltip}>{`Новых навыков в среднем за год: ${Math.floor(tag.count)}`}</span>
  </span>
);
