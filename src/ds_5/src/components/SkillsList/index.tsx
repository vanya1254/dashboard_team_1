import React, { useEffect, useState } from 'react';
import { RiFilter2Fill } from 'react-icons/ri';

import styles from './SkillsList.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { empDashSelector } from '../../redux/features/empDash/selectors';
import { Status } from '../../redux/mainTypes';

const data = [
  {
    skill: 'Frameworks',
    curSkills: ['react', 'next', 'redux', 'react', 'next', 'redux', 'react', 'next', 'redux', 'react', 'next', 'redux'],
    development: ['scss', 'html']
  },
  {
    skill: 'Databases',
    curSkills: ['mysql', 'postgresql', 'mongodb'],
    development: ['sql', 'nosql']
  },
  {
    skill: 'Tools',
    curSkills: ['webpack', 'babel', 'eslint'],
    development: ['npm', 'yarn']
  },
  {
    skill: 'Platforms',
    curSkills: ['aws', 'azure', 'google cloud'],
    development: ['docker', 'kubernetes']
  },
  {
    skill: 'Spheres',
    curSkills: ['web development', 'mobile development', 'data science'],
    development: ['frontend', 'backend']
  },
  {
    skill: 'Technologies',
    curSkills: ['blockchain', 'ai', 'iot'],
    development: ['machine learning', 'cloud computing']
  },
  {
    skill: 'Types System',
    curSkills: ['typescript', 'flow'],
    development: ['static typing', 'dynamic typing']
  },
  {
    skill: 'Frameworks',
    curSkills: ['angular', 'vue', 'svelte'],
    development: ['css modules', 'styled-components']
  },
  {
    skill: 'Languages',
    curSkills: ['javascript', 'python', 'java'],
    development: ['es6', 'django']
  }
];

export const SkillsList: React.FC = () => {
  const { empSkillsList, status } = useAppSelector(empDashSelector);

  const [isOpen, setIsOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);

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
      <button className={styles.root_btn} onClick={onClickCategories}>
        <span>Категория навыков</span>
      </button>
      <div className={`${styles.root__categories}${isOpen ? ` ${styles.root__categories_activated}` : ''} scroller`}>
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
