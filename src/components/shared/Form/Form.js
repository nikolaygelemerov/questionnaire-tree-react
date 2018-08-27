import React, { Component } from 'react';

import { FORM_ELEMENT_TYPES as formElementTypes } from '../../../constants/constants';
import { VALIDATION } from '../../../constants/constants';

class Form extends Component {
  formElementChangedHandler = (event, elementIdentifier, blockIdentifier) => {
    const updatedFormData = blockIdentifier
      ? { ...this.state.formFields }
      : [...this.state.formFields];

    let originalElement;
    let blockUpdated;
    let originalElInd;
    if (blockIdentifier) {
      blockUpdated = [...updatedFormData[blockIdentifier]];
    }
    const elementsArray = blockIdentifier ? blockUpdated : updatedFormData;
    originalElInd = elementsArray.findIndex(
      element => element.key === elementIdentifier
    );
    originalElement = elementsArray[originalElInd];

    const elementChanged = { ...originalElement };

    elementChanged.value = this.getElementValue(event, elementChanged);
    // set file picker image name here
    if (elementChanged.elementType === formElementTypes.filePicker) {
      elementChanged.imageName = event.fileList ? event.fileList[0].name : '';
    }

    if (elementChanged.validationRequired) {
      elementChanged.touched = VALIDATION.touched;
      elementChanged.error = this.validateLength(elementChanged);
    }

    elementsArray[originalElInd] = elementChanged;
    if (blockIdentifier) {
      updatedFormData[blockIdentifier] = blockUpdated;
    }

    if (this.state.initialState) {
      this.setState(
        prevState => {
          if (
            elementChanged.value !== this.state.initialState[elementChanged.key]
          ) {
            return {
              editableElements: [
                ...prevState.editableElements,
                elementChanged.key
              ]
            };
          } else {
            return {
              editableElements: prevState.editableElements.filter(element => {
                return elementChanged.key !== element;
              })
            };
          }
        },
        () =>
          this.setState({
            isFormEdited: this.state.editableElements.length > 0
          })
      );
    }
    this.setState({
      formFields: updatedFormData
    });
  };

  validateLength = element => {
    return (
      element.value.length > element.maxLength ||
      (element.required && element.value.length === 0)
    );
  };

  getElementValue = (event, elementChanged) => {
    switch (elementChanged.elementType) {
      case formElementTypes.checkbox:
        return !elementChanged.value;
      case formElementTypes.filePicker:
        const base64 = event.base64;
        const base64WithoutImageType = event
          ? base64.substring(base64.indexOf(',') + 1)
          : '';
        return base64WithoutImageType;
      default:
        return event.target.value;
    }
  };

  //pass this in extended class Form tag as prop : onFormSubmit={this.submitFormHandler}
  submitFormHandler = event => {
    event.preventDefault();

    const sendData = {};

    Object.keys(this.state.formFields).forEach(fieldName => {
      if (this.state.formFields[fieldName].constructor === Array) {
        this.state.formFields[fieldName].forEach((field, index) => {
          sendData[field.key] = field.value;
        });
      } else {
        sendData[this.state.formFields[fieldName].key] = this.state.formFields[
          fieldName
        ].value;
      }
    });

    this.onAfterSubmit(sendData);
  };

  //override this in extended class
  onAfterSubmit = sendData => {};

  render() {
    return (
      <form onSubmit={this.props.onFormSubmit}>{this.props.children}</form>
    );
  }
}

export default Form;
