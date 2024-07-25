import React from 'react';

import styles from './ToggleCustom.module.scss';

type ToggleCustomPropsT = {
  isToggled: boolean;
  onToggle: () => void;
};

export const ToggleCustom: React.FC<ToggleCustomPropsT> = ({ isToggled, onToggle }) => {
  return (
    <label className={styles.root}>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={styles.root_switch} />
    </label>
  );
};
