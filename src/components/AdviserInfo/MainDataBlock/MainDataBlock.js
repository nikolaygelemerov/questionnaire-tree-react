import React from 'react';

import classes from './MainDataBlock.scss';
import FormElement from '../../shared/FormElements/FormElement';

const mainDataBlock = props => {
  let secondaryTitle = props.secondaryTitle ? (
    <span className={classes.SecondaryTitle}>{props.secondaryTitle}</span>
  ) : null;

  return (
    <div className={classes.MainDataBlock}>
      <div className={classes.Title}>
        <span className={classes.FirstTitle}>{props.title}</span>
        {secondaryTitle}
      </div>
      <div className={classes.Content}>
        {props.fields.map(element => (
          <FormElement
            changed={event =>
              props.changed(event, element.key, props.blockIdentifier)
            }
            key={element.key}
            label={element.label}
            elementType={element.elementType}
            elementConfig={element.config}
            value={element.value}
          />
        ))}
      </div>
    </div>
  );
};

export default mainDataBlock;
