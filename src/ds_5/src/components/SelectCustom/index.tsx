import React, { useState } from 'react';
import { RiFilter2Fill } from 'react-icons/ri';

import styles from './SelectCustom.module.scss';

type SelectCustomPropsT = {
  onClickFilter: (filter: string) => void;
  selectTitle: string;
  options: string[];
};

export const SelectCustom: React.FC<SelectCustomPropsT> = ({ onClickFilter, selectTitle, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(0);

  const onClickCategories = () => {
    setIsOpen((prev) => !prev);
  };

  const onClickSkill = (idx: number) => {
    onClickFilter(options[idx]);
    setActiveOption(idx);
    setIsOpen(false);
  };

  return (
    <div className={styles.root}>
      <button className={styles.root_btn} onClick={onClickCategories}>
        <RiFilter2Fill />
        <span>{selectTitle}</span>
      </button>
      <div className={`${styles.root__options}${isOpen ? ` ${styles.root__options_activated}` : ''}`}>
        <ul>
          {options.map((option, i) => (
            <li className={`${activeOption === i ? ` activeOption` : ''}`} key={i} onClick={() => onClickSkill(i)}>
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};