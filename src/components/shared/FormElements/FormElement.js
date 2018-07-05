import React from 'react';

import classes from './FormElement.scss';

import Input from './Input/Input';
import Select from './Select/Select';
import TextArea from './TextArea/TextArea';
import CheckBox from '../Checkbox/Checkbox';
import { FORM_ELEMENT_TYPES as elementTypes } from '../../../constants/constants';

const formElement = props => {
  let inputElement = null;

  switch (props.elementType) {
    case elementTypes.input:
      inputElement = (
        <Input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case elementTypes.textArea:
      inputElement = (
        <TextArea
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case elementTypes.select:
      inputElement = (
        <Select
          value={props.value}
          onChange={props.changed}
          options={props.elementConfig.options}
        />
      );
      break;
    case elementTypes.checkbox:
      inputElement = (
        <CheckBox
          updateCheckBoxHandler={props.changed}
          isChecked={props.value}
        />
      );
      break;
    default:
      inputElement = <Input {...props.elementConfig} value={props.value} />;
  }

  return (
    <div className={classes.FormElement}>
      <div className={classes.Label}>
        <label>{props.label}</label>
      </div>
      <div className={classes.Element}>{inputElement}</div>
    </div>
  );
};

export default formElement;
