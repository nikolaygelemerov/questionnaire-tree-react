import React from 'react';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';
import withProviderConsumer from '../../../../hoc/withProviderConsumer/withProviderConsumer';
import { Link } from 'react-router-dom';

import Modal from '../../../shared/Modal/Modal';
import FormElement from '../../../../components/shared/Form/FormElements/FormElement';
import ActionButton from '../../../shared/ActionButton/ActionButton';
import Form from '../../../shared/Form/Form';
import styles from './NewQuestionModal.scss';
import {
  ACTION_BUTTON_ORANGE,
  VALIDATION,
  FORM_ELEMENT_TYPES,
  BUTTON_TYPES,
  QUESTION_FIELDS
} from '../../../../constants/constants';
import {
  allQuestions,
  createAnswer,
  newQuestion
} from '../../../../translations/translations';
import { QUESTION as URLS } from '../../../../constants/backendUrls';
import newQuestionState from '../NewQuestionBlock/NewQuestionState';
import LINKS from '../../../../constants/urls';
import axios from '../../../../services/axios';
import { idStringReplace, stringReplace } from '../../../../services/helpers';

const translations = { ...allQuestions, ...createAnswer, ...newQuestion };

class NewQuestionModal extends Form {
  state = {
    ...newQuestionState
  };

  componentDidMount() {
    if (this.props.activeQuestion) {
      this.setState({ activeQuestion: this.props.activeQuestion });
    }
    this.resetForm();
  }

  closeNewQuestionModal = shouldTriggerQuestionsLoad => {
    this.props.closeNewQuestionModal(shouldTriggerQuestionsLoad);
  };

  resetForm = () => {
    let updatedFormData = [...this.state.formFields];
    updatedFormData.forEach(element => {
      element.value = '';
      element.touched = '';
    });
    this.setState(
      {
        formFields: [...updatedFormData]
      },
      () => {
        this.getAnswerTypes();
      }
    );
  };

  getAnswerTypes = async () => {
    try {
      const response = await axios.get(URLS.get.answerTypes);
      const fetchedSelectData = [...this.state.formFields];
      const answerTypeFieldIndex = fetchedSelectData.findIndex(
        el => el.key === QUESTION_FIELDS.answerType
      );
      const answerTypeField = { ...fetchedSelectData[answerTypeFieldIndex] };
      answerTypeField.config.options = response.data;
      fetchedSelectData[answerTypeFieldIndex] = answerTypeField;

      this.setActiveQuestion(fetchedSelectData);
    } catch (error) {
      console.error(error);
    }
  };

  setActiveQuestion = formFields => {
    if (this.props.activeQuestion) {
      formFields.forEach(el => {
        this.setFieldValue(el);
        el.disabled =
          el.key === QUESTION_FIELDS.answerType &&
          this.props.activeQuestion.answers.length > 0;
      });
    }

    const stateObject = {
      formFields: [...formFields]
    };
    stateObject.isEditing = !!this.props.activeQuestion;
    this.setState(stateObject);
  };

  setFieldValue = field => {
    let value = null;
    const activeQuestion = this.props.activeQuestion;
    switch (field.key) {
      case QUESTION_FIELDS.name:
        value = activeQuestion.publicName;
        break;
      case QUESTION_FIELDS.backendName:
        value = activeQuestion.internalName;
        break;
      case QUESTION_FIELDS.question:
        value = activeQuestion.questionText;
        break;
      case QUESTION_FIELDS.answerType:
        value = activeQuestion.answerType.id;
        break;
      default:
        break;
    }
    field.value = value;
  };

  onAfterSubmit = sendData => {
    this.saveNewQuestion(sendData);
  };

  saveNewQuestion = async formData => {
    const requestData = {
      publicName: formData.name,
      internalName: formData.backendName,
      questionText: formData.question,
      answerType: +formData.answerType
    };
    try {
      const requestURL = this.state.isEditing
        ? stringReplace(URLS.put.edit, [
            { key: '{advisorId}', value: this.props.activeAdviser },
            { key: '{questionId}', value: this.props.activeQuestion.id }
          ])
        : idStringReplace(URLS.post.create, this.props.activeAdviser);
      const method = this.state.isEditing ? 'put' : 'post';
      const response = await axios[method](requestURL, requestData, {
        errorMsg: translations.newQuestionCreateErrorMsg
      });
      this.props.saveNewQuestion(response.data, this.state.isEditing);
    } catch (error) {
      console.error(error);
    }
  };

  deleteQuestion = async () => {
    try {
      await axios.delete(
        stringReplace(URLS.delete.question, [
          { key: '{advisorId}', value: this.props.activeAdviser },
          { key: '{questionId}', value: this.props.activeQuestion.id }
        ]),
        {
          params: {},
          errorMsg: translations.getQuestionError
        }
      );
      this.closeNewQuestionModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    let emptyForm = this.state.formFields.some(field => {
      return field.value === '';
    });

    const proceedButton = (
      <div className={styles.SaveButton}>
        <ActionButton
          type={BUTTON_TYPES.submit}
          title={translations.newQuestionButton}
          addClass={ACTION_BUTTON_ORANGE}
          disabled={emptyForm}
        />
      </div>
    );

    const deleteBlock = this.state.isEditing ? (
      <div className={styles.DeleteWrapper}>
        {this.props.activeQuestion.isPartOfTree ? (
          <div className={styles.PartOfTreeWrapper}>
            <span className={styles.PartOfTreeLabel}>
              {translations.questionIsPartOfTree}
            </span>
            <Link
              className={styles.GoToTree}
              to={`${LINKS.mainData}${LINKS.questionnaireTree}/${
                this.props.activeAdviser
              }`}
            >
              {translations.goToTree}
            </Link>
          </div>
        ) : null}
        <div
          className={`${styles.Text}${
            this.props.activeQuestion.isPartOfTree ? ` ${styles.Disable}` : ''
          }`}
        >
          {translations.deleteQuestion}
        </div>
        <div
          className={`${styles.Delete}${
            this.props.activeQuestion.isPartOfTree ? ` ${styles.Disable}` : ''
          }`}
          onClick={this.deleteQuestion}
        />
      </div>
    ) : null;

    return (
      <Form
        onFormSubmit={this.submitFormHandler}
        onAfterSubmit={this.onAfterSubmit}
      >
        <Modal
          title={translations.newQuestionButton}
          secondaryTitle={translations.secondaryTitle}
          secondaryTitleRequired={true}
          classWidth={styles.ModalWrapper}
          proceedButton={proceedButton}
          afterModalClose={this.props.onModalClose}
          show={this.props.show}
        >
          {this.state.formFields.map(element => {
            return (
              <FormElement
                disabled={element.disabled}
                changed={event =>
                  this.formElementChangedHandler(event, element.key)
                }
                nameKey={element.nameKey}
                styles={element.styles}
                key={element.key}
                label={element.label}
                elementType={element.elementType}
                elementConfig={element.config}
                info={
                  element.elementType !== FORM_ELEMENT_TYPES.select
                    ? `${element.value.length} / ${element.maxLength} ${
                        translations.characters
                      }${
                        element.error && element.value.length > 0
                          ? ` - ${element.errorMsg}`
                          : ''
                      }`
                    : null
                }
                value={element.value}
                touched={element.touched}
                error={element.error ? VALIDATION.error : VALIDATION.valid}
                tooltip={element.tooltip ? element.tooltip : ''}
                required={element.required ? element.required : false}
              />
            );
          })}
          {deleteBlock}
        </Modal>
      </Form>
    );
  }
}

export default withErrorHandler(
  withProviderConsumer(NewQuestionModal, ['activeAdviser']),
  axios
);
