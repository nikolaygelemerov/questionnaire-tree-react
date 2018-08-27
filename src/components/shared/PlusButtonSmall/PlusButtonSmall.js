import React from 'react';

import styles from './PlusButtonSmall.scss';
import PlusButton from '../PlusButton/PlusButton';

const PlusButtonSmall = props => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Button} onClick={props.click}>
        <PlusButton border="unset" />
      </div>
      <div className={styles.Label}>{props.text}</div>
    </div>
  );
};

export default PlusButtonSmall;
