import React, { useEffect, useRef, useState } from 'react';

import { useAppSelector } from '../../redux/store';
import { empDashSelector } from '../../redux/features/empDash/selectors';

import { Status } from '../../redux/mainTypes';

import useOutsideClick from '../../hooks/useOutsideClick';

import styles from './SkillsList.module.scss';

/**
 * Компонент SkillsList отображает список навыков сотрудника и область развития выбранного навыка.
 *
 * - empSkillsList: список навыков сотрудника, полученный из Redux store.
 * - status: состояние загрузки данных (Fulfilled, Pending, Rejected, No Data).
 *
 * Компонент включает:
 * - Кнопку для открытия/закрытия списка навыков.
 * - Список навыков с возможностью выбора. При выборе навыка отображается его область развития.
 * - Используется хук `useOutsideClick` для закрытия списка при клике вне его области.
 *
 * Компонент управляет внутренним состоянием:
 * - `isOpen`: флаг, указывающий, открыт ли список навыков.
 * - `activeSkill`: индекс выбранного навыка.
 *
 * При изменении статуса данных (`status`), выбранный навык сбрасывается на первый.
 */
export const SkillsList: React.FC = () => {
  const wrapperRef = useRef(null);
  const btnRef = useRef(null);
  const { empSkillsList, status } = useAppSelector(empDashSelector);

  const [isOpen, setIsOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);

  useOutsideClick(wrapperRef, setIsOpen, btnRef);

  const onClickCategories = () => {
    setIsOpen((prev) => !prev);
  };

  const onClickSkill = (idx: number) => {
    setActiveSkill(idx);
    setIsOpen(false);
  };

  useEffect(() => {
    setActiveSkill(0);
  }, [status]);

  return (
    <div className={styles.root}>
      <button ref={btnRef} className={styles.root_btn} onClick={onClickCategories}>
        <span>Категория навыков</span>
      </button>
      <div
        ref={wrapperRef}
        className={`${styles.root__categories}${isOpen ? ` ${styles.root__categories_activated}` : ''} scroller`}
      >
        <ul>
          {status === Status.Fulfilled && empSkillsList.length
            ? empSkillsList.map((skill, i) => (
                <li className={`${activeSkill === i ? ` activeOption` : ''}`} key={i} onClick={() => onClickSkill(i)}>
                  {skill.skill}
                </li>
              ))
            : status === Status.Pending
            ? 'Загрузка...'
            : status === Status.Rejected
            ? 'Ошибка('
            : 'Нет данных'}
        </ul>
      </div>
      <div className={styles.root__skills}>
        <div className={styles.root__skills__list}>
          <h3>Область развития:</h3>
          <ul className="scroller">
            {status === Status.Fulfilled && empSkillsList.length
              ? empSkillsList[activeSkill].nextSkills.map((dSkill, i) => <li key={i}>{dSkill}</li>)
              : status === Status.Pending
              ? 'Загрузка...'
              : status === Status.Rejected
              ? 'Ошибка('
              : 'Нет данных'}
          </ul>
        </div>
      </div>
    </div>
  );
};
