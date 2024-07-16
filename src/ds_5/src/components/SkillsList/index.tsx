import React, { useState } from 'react';
import { RiFilter2Fill } from 'react-icons/ri';

import styles from './SkillsList.module.scss';

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
  const [isOpen, setIsOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);

  const onClickCategories = () => {
    setIsOpen((prev) => !prev);
  };

  const onClickSkill = (idx: number) => {
    setActiveSkill(idx);
    setIsOpen(false);
  };

  return (
    <div className={styles.root}>
      <button className={styles.root_btn} onClick={onClickCategories}>
        <RiFilter2Fill />
        <span>Категория навыков</span>
      </button>
      <div className={`${styles.root__categories}${isOpen ? ` ${styles.root__categories_activated}` : ''}`}>
        <ul>
          {data.map((skill, i) => (
            <li className={`${activeSkill === i ? ` activeSkill` : ''}`} key={i} onClick={() => onClickSkill(i)}>
              {skill.skill}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.root__skills}>
        <div className={styles.root__skills__list}>
          <h3>Текущие навыки:</h3>
          <ul className="scroll">
            {data[activeSkill].curSkills.map((cSkill, i) => (
              <li key={i}>{cSkill}</li>
            ))}
          </ul>
        </div>
        <div className={styles.root__skills__list}>
          <h3>Область развития:</h3>
          <ul className="scroll">
            {data[activeSkill].development.map((dSkill, i) => (
              <li key={i}>{dSkill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};