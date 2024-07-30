import React, { useRef, useState } from 'react';
import { RiFilter2Fill } from 'react-icons/ri';

import { CoobDataI } from '../../redux/mainTypes';

import styles from './SelectCustom.module.scss';
import useOutsideClick from '../../hooks/useOutsideClick';

type SelectCustomPropsT = {
  onClickFilter: (filter: any) => void; //TODO
  selectTitle: string;
  options: CoobDataI[];
  isReset: boolean;
};

export const SelectCustom: React.FC<SelectCustomPropsT> = ({ onClickFilter, selectTitle, options, isReset }) => {
  const wrapperRef = useRef(null);
  const btnRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(0);
  useOutsideClick(wrapperRef, setIsOpen, btnRef);

  const onClickCategories = () => {
    if (isReset) {
      setActiveOption(0);
    }
    setIsOpen((prev) => !prev);
  };

  const onClickSkill = (idx: number) => {
    onClickFilter(options[idx]);

    if (activeOption === idx) {
      setActiveOption(0);
    } else {
      setActiveOption(idx);
    }

    setIsOpen(false);
  };

  return (
    <div className={styles.root}>
      <button ref={btnRef} className={styles.root_btn} onClick={onClickCategories}>
        <RiFilter2Fill />
        <span>{selectTitle}</span>
      </button>
      <div
        ref={wrapperRef}
        className={`${styles.root__options}${isOpen ? ` ${styles.root__options_activated}` : ''} scroller`}
      >
        <ul>
          {options.map((option, i) => (
            <li className={`${activeOption === i ? ` activeOption` : ''}`} key={i} onClick={() => onClickSkill(i)}>
              {option[Object.keys(options[0])[0]]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
