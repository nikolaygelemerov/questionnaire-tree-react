import React from 'react';

import classes from './MainDataBlock.scss';
import FormElement from '../../shared/Form/FormElements/FormElement';
import { VALIDATION } from '../../../constants/constants';
import { adviserMainData as translations } from '../../../translations/translations';

const mainDataBlock = props => {
  let secondaryTitle = props.secondaryTitle ? (
    <span className={classes.SecondaryTitle}>
      {props.secondaryTitle}
      <span className={classes.Required}>*</span>
    </span>
  ) : null;

  return (
    <div className={classes.MainDataBlock}>
      <div className={classes.Title}>
        <span className={classes.FirstTitle}>{props.title}</span>
        {secondaryTitle}
      </div>
      <div className={classes.Content}>
        {props.fields.map(element => {
          return (
            <FormElement
              changed={event =>
                props.changed(event, element.key, props.blockIdentifier)
              }
              value={element.value}
              key={element.key}
              label={element.label}
              elementType={element.elementType}
              elementConfig={element.config}
              imageName={element.imageName}
              touched={element.touched}
              error={element.error ? VALIDATION.error : VALIDATION.valid}
              required={element.required ? element.required : false}
              info={element.error ? element.errorMsg : ''}
              tooltip={element.tooltip ? element.tooltip : ''}
              emptyLabel={translations.addImageLabel}
            />
          );
        })}
      </div>
    </div>
  );
};

export default mainDataBlock;
