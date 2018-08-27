import React from 'react';

import items from '../../../../../styles/components/_switch-item.scss';
import ActionButton from '../../../../shared/ActionButton/ActionButton';
import PlusButton from '../../../../shared/PlusButton/PlusButton';

const AddQuestion = props => {
  return (
    <div className={`${items.SwitchItem} ${props.mainClasses}`}>
      <div className={items.Image}>
        <PlusButton />
      </div>
      {props.label ? <div className={items.Title}>{props.label}</div> : null}
      {props.button ? <ActionButton {...props.button} /> : null}
    </div>
  );
};

export default AddQuestion;
