import React from 'react';

import classes from './FormElement.scss';

import Input from '../FormElements/Input/Input';
import Select from '../FormElements/Select/Select';
import TextArea from '../FormElements/TextArea/TextArea';
import FilePicker from '../FormElements/FilePicker/FilePicker';
import MultiSelect from '../FormElements/MultiSelect/MultiSelect';
import CheckBox from '../../Checkbox/Checkbox';
import Tooltip from '../../Tooltip/Tooltip';
import { FORM_ELEMENT_TYPES as elementTypes } from '../../../../constants/constants';
import { VALIDATION } from '../../../../constants/constants';

const formElement = props => {
  let formElement = null;

  switch (props.elementType) {
    case elementTypes.input:
      formElement = (
        <Input
          {...props.elementConfig}
          value={props.value}
          error={props.error}
          touched={props.touched}
          onChange={props.changed}
        />
      );
      break;
    case elementTypes.textArea:
      formElement = (
        <TextArea
          {...props.elementConfig}
          value={props.value}
          error={props.error}
          touched={props.touched}
          onChange={props.changed}
        />
      );
      break;
    case elementTypes.select:
      formElement = (
        <Select
          nameKey={props.nameKey}
          value={props.value}
          onChange={props.changed}
          options={props.elementConfig.options}
          placeholder={props.elementConfig.placeholder}
          disabled={props.disabled}
        />
      );
      break;
    case elementTypes.checkbox:
      formElement = (
        <CheckBox
          updateCheckBoxHandler={props.changed}
          isChecked={props.value}
        />
      );
      break;
    case elementTypes.filePicker:
      formElement = (
        <FilePicker
          imageName={props.imageName}
          fileChanged={props.changed}
          emptyLabel={props.emptyLabel}
        />
      );
      break;
    case elementTypes.multiSelect:
      formElement = (
        <MultiSelect
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      formElement = (
        <Input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  const formElementClasses =
    props.styles && props.styles.inline
      ? [classes.FormElementWrapper, classes.Inline]
      : [classes.FormElementWrapper];

  const labelStyles =
    props.styles && props.styles.labelWidth
      ? { width: props.styles.labelWidth }
      : null;

  const elementStyles =
    props.styles && props.styles.elementWidth
      ? { width: props.styles.elementWidth }
      : null;

  const wrapperStyles =
    props.styles && props.styles.width ? { width: props.styles.width } : {};
  wrapperStyles.alignItems =
    props.elementType === elementTypes.textArea ? 'baseline' : 'center';

  const tooltip = props.tooltip ? (
    <div className={classes.Tooltip}>
      <Tooltip text={props.tooltip} />
    </div>
  ) : null;

  const messageStyles =
    tooltip || (props.styles && props.styles.labelWidth)
      ? { width: 'calc(60% - 55px)' }
      : {};

  return (
    <div className={formElementClasses.join(' ')}>
      <div className={classes.FormElement} style={wrapperStyles}>
        <div className={classes.Label} style={labelStyles}>
          <div>
            <label>
              {props.label}
              {props.required ? (
                <span className={classes.Required}>*</span>
              ) : null}
            </label>
          </div>
        </div>
        {tooltip}
        <div className={classes.Element} style={elementStyles}>
          {formElement}
        </div>
      </div>
      <div
        style={messageStyles}
        className={`${classes.Message} ${
          props.error === VALIDATION.valid ? classes.Info : classes.Error
        }`}
      >
        {props.info}
      </div>
    </div>
  );
};

export default formElement;
