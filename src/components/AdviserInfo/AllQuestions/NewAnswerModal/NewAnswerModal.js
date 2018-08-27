import React, { Fragment } from 'react';

import Modal from '../../../shared/Modal/Modal';
import ActionButton from '../../../shared/ActionButton/ActionButton';
import axios from '../../../../services/axios';
import withProviderConsumer from '../../../../hoc/withProviderConsumer/withProviderConsumer';
import styles from './NewAnswerModal.scss';
import {
  ACTION_BUTTON_ORANGE,
  BUTTON_TYPES,
  CREATE_ANSWER,
  FORM_ELEMENT_TYPES,
  QUESTION,
  IMAGE_ERROR_KEY
} from '../../../../constants/constants';
import { createAnswer as translations } from '../../../../translations/translations';
import AnswersOverview from './AnswersOverview/AnswersOverview';
import NewAnswer from './NewAnswer/NewAnswer';
import PlusButtonSmall from '../../../shared/PlusButtonSmall/PlusButtonSmall';
import { answerFields, answerFieldsSlider } from './NewAnswerModalFields';
import {
  propertyGroupField,
  propertyField,
  propertyOptionsField,
  maxField,
  minField,
  suffixField
} from './NewAnswer/FilterBlock/FilterBlockFields';
import { idGenerator, stringReplace } from '../../../../services/helpers';
import Form from '../../../shared/Form/Form';
import { ANSWER as URLS } from '../../../../constants/backendUrls';
import InfoMessage from '../../../shared/InfoMessage/InfoMessage';

class NewAnswerModal extends Form {
  constructor(props) {
    super(props);
    this.isSlider = props.activeQuestion.answerType.id === QUESTION.typeSlider;
    this.state = {
      showOverview: null,
      formFields: {
        answerFields: this.isSlider
          ? [...answerFieldsSlider]
          : [...answerFields],
        filters: []
      },
      answers: [],
      propertyGroups: [],
      isEditing: false,
      editingAnswerId: null,
      showMsg: false,
      infoMsg: {
        success: false,
        title: '',
        content: ''
      }
    };
  }

  onAfterSubmit = sendData => {
    this.saveAnswer(sendData);
  };

  showNewAnswerView = () => {
    this.setState({ showOverview: false });
  };

  saveAnswer = async sendData => {
    sendData.filters = this.parseFiltersSend();
    try {
      const requestUrl = this.state.isEditing
        ? stringReplace(URLS.put.editAnswer, [
            { key: '{advisorId}', value: this.props.activeAdviser },
            { key: '{questionId}', value: this.props.activeQuestion.id },
            { key: '{answerId}', value: this.state.editingAnswerId }
          ])
        : stringReplace(URLS.post.createAnswer, [
            { key: '{advisorId}', value: this.props.activeAdviser },
            { key: '{questionId}', value: this.props.activeQuestion.id }
          ]);
      const method = this.state.isEditing ? 'put' : 'post';
      await axios[method](
        requestUrl,
        { ...sendData },
        { errorMsg: translations.fetchAnswerDataError }
      );

      this.clearFields();
      this.setState({
        showOverview: true,
        isEditing: false,
        editingAnswerId: null
      });
    } catch (error) {
      console.error(error);
      this.handleError(error);
    }
  };

  clearFields = () => {
    const formFields = { ...this.state.formFields };
    formFields.answerFields = this.isSlider
      ? [...answerFieldsSlider]
      : [...answerFields];

    formFields.filters = [];

    this.setState({ formFields: formFields });
  };

  parseFiltersSend = () => {
    let filters = [];
    const stateFilters = [...this.state.formFields.filters];
    stateFilters.forEach(filter => {
      const filterFields = { ...filter.fields };
      const propertyField = { ...filterFields[CREATE_ANSWER.propertyField] };
      const propertyGroupField = {
        ...filterFields[CREATE_ANSWER.propertyGroupField]
      };
      const property = this.findProperty(
        propertyField.value,
        propertyGroupField.value
      );

      const newFilterOptions = [];
      if (property.type !== CREATE_ANSWER.menuFilter) {
        const propertyCopy = { ...property };
        propertyCopy.propertyOptions = {
          maxPropertyValue: +filterFields.maxField.value,
          minPropertyValue: +filterFields.minField.value,
          suffix: filterFields.suffixField.value
        };
        newFilterOptions.push(propertyCopy);
      } else {
        const propertyOptionsField = {
          ...filterFields[CREATE_ANSWER.propertyOptionsField]
        };
        const options = [...propertyOptionsField.value];
        const filterOptions = [...property.propertyOptions].filter(el => {
          return options.includes(el.id);
        });

        filterOptions.forEach(el => {
          const elCpy = { ...el };
          delete elCpy.value;
          newFilterOptions.push(elCpy);
        });
      }

      filters = filters.concat(newFilterOptions);
    });
    return filters;
  };

  addFilter = () => {
    const fields = { ...this.state.formFields };
    const filters = [...fields.filters];
    const propertyGroupFieldCopy = { ...propertyGroupField };
    propertyGroupFieldCopy.config.options = this.state.propertyGroups;
    const filterFields = {
      propertyGroupField: propertyGroupFieldCopy,
      propertyField: { ...propertyField }
    };

    filters.push({
      id: idGenerator(),
      name: `Filter ${filters.length + 1}`,
      fields: filterFields
    });

    fields.filters = filters;
    this.setState({ formFields: fields });
  };

  getFilterFields = isMenuFilter => {
    const propertyGroupFieldCopy = { ...propertyGroupField };
    propertyGroupFieldCopy.config.options = this.state.propertyGroups;
    return isMenuFilter
      ? {
          propertyGroupField: propertyGroupFieldCopy,
          propertyField: { ...propertyField },
          propertyOptionsField: { ...propertyOptionsField }
        }
      : {
          propertyGroupField: propertyGroupFieldCopy,
          propertyField: { ...propertyField },
          minField: { ...minField },
          maxField: { ...maxField },
          suffixField: { ...suffixField }
        };
  };

  sendIsAnswerActiveRequest = async (answerId, showWarning) => {
    const answers = [...this.state.answers];
    let answerIndex = answers.findIndex(element => element.id === answerId);
    const answerCopy = { ...answers[answerIndex] };
    answerCopy.isActive = !answerCopy.isActive;
    const active = answerCopy.isActive;

    const filters = answerCopy.menuFilters
      .concat(answerCopy.numericFilters)
      .concat(answerCopy.specialFilters);

    let sendFilters = [];
    filters.forEach(filter => {
      const property = this.findProperty(
        filter.propertyId,
        filter.propertyGroupId + filter.propertyGroupName
      );
      let copyOption = {};
      if (filter.type === CREATE_ANSWER.menuFilter) {
        const options = property.propertyOptions;
        const option = options.find(
          option => filter.propertyOptionId === option.id
        );
        copyOption = { ...option };
        delete copyOption.value;
      } else {
        copyOption = { ...property };

        const sendOption = {
          maxPropertyValue: filter.maxPropertyValue,
          minPropertyValue: filter.minPropertyValue,
          suffix: filter.suffix
        };
        copyOption.propertyOptions = sendOption;
      }
      sendFilters.push(copyOption);
    });

    const sendObject = {
      additionalText: answerCopy.additionalText,
      answer: answerCopy.answer,
      filters: sendFilters || [],
      image: answerCopy.image || '',
      isActive: active
    };
    try {
      await axios.put(
        stringReplace(URLS.put.editAnswer, [
          { key: '{advisorId}', value: this.props.activeAdviser },
          { key: '{questionId}', value: this.props.activeQuestion.id },
          { key: '{answerId}', value: answerId }
        ]),
        { ...sendObject },
        { errorMsg: translations.fetchPropertyGroupsError }
      );

      if (typeof showWarning !== 'undefined') {
        answerCopy.showWarning = showWarning;
      }
      answers[answerIndex] = answerCopy;
      this.setState({ answers: answers });
    } catch (error) {
      console.error(error);
      this.handleError(error);
    }
  };

  updateIsAnswerActive = (answerId, showWarning) => {
    this.sendIsAnswerActiveRequest(answerId, showWarning);
  };

  deleteAnswer = async answerId => {
    try {
      await axios.delete(
        stringReplace(URLS.delete.answer, [
          { key: '{advisorId}', value: this.props.activeAdviser },
          { key: '{questionId}', value: this.props.activeQuestion.id },
          { key: '{answerId}', value: answerId }
        ]),
        {
          params: {},
          errorMsg: translations.fetchPropertyGroupsError
        }
      );
      let answers = [...this.state.answers];
      answers = answers.filter(element => element.id !== answerId);
      this.setState({ answers: answers });
    } catch (error) {
      console.error(error);
      this.handleError(error);
    }
  };

  editAnswer = async answerId => {
    this.fetchAnswerData(answerId);
  };

  fetchAnswerData = async answerId => {
    try {
      const response = await axios.get(
        stringReplace(URLS.get.answer, [
          { key: '{advisorId}', value: this.props.activeAdviser },
          { key: '{questionId}', value: this.props.activeQuestion.id },
          { key: '{answerId}', value: answerId }
        ]),
        {
          params: {},
          errorMsg: translations.fetchAnswerDataError
        }
      );

      this.setAnswerFields(response.data);
    } catch (error) {
      console.error(error);
      this.handleError(error);
    }
  };

  setAnswerFields = answer => {
    const formFields = { ...this.state.formFields };
    const answerFields = [...formFields.answerFields];

    answerFields.forEach((el, index) => {
      const answerField = { ...el };
      answerField.value = answer[answerField.key];
      if (answerField.elementType === FORM_ELEMENT_TYPES.filePicker) {
        answerField.imageName = answer[answerField.key];
        if (!answerField.value) {
          answerField.value = '';
        }
      }
      answerFields[index] = answerField;
    });
    formFields.answerFields = answerFields;

    formFields.filters = this.getNewFilters(answer);

    this.setState({
      formFields: formFields,
      isEditing: true,
      showOverview: false,
      editingAnswerId: answer.id
    });
  };

  getNewFilters = answer => {
    const answerFilters = [...answer.menuFilters]
      .concat([...answer.numericFilters])
      .concat([...answer.specialFilters]);
    const newFilters = {};

    for (let ind = 0; ind < answerFilters.length; ind++) {
      const filter = answerFilters[ind];
      const groupId = filter.propertyGroupId + filter.propertyGroupName;
      if (!newFilters[groupId]) {
        newFilters[groupId] = {
          [filter.propertyId]: { filters: [filter] }
        };
      } else {
        if (!newFilters[groupId][filter.propertyId]) {
          newFilters[groupId][filter.propertyId] = {
            filters: [filter]
          };
        } else {
          if (
            !newFilters[groupId][filter.propertyId].filters.find(el => {
              return groupId === el.id + el.propertyGroupName;
            })
          ) {
            newFilters[groupId][filter.propertyId].filters.push(filter);
          }
        }
      }
    }

    let stateFilters = [];
    for (let groupId in newFilters) {
      if (newFilters.hasOwnProperty(groupId)) {
        for (let propertyId in newFilters[groupId]) {
          if (newFilters[groupId].hasOwnProperty(propertyId)) {
            const isMenuFilter =
              newFilters[groupId][propertyId].filters[0].type ===
              CREATE_ANSWER.menuFilter;
            const filterFields = this.getFilterFields(isMenuFilter);
            filterFields[CREATE_ANSWER.propertyGroupField].value = groupId;
            filterFields[CREATE_ANSWER.propertyField].value = +propertyId;
            filterFields[
              CREATE_ANSWER.propertyField
            ].config.options = this.findPropertyGroup(groupId).properties;
            filterFields[CREATE_ANSWER.propertyField].hidden = false;

            if (isMenuFilter) {
              const values = [];
              newFilters[groupId][propertyId].filters.forEach(el =>
                values.push(el.propertyOptionId)
              );
              filterFields[CREATE_ANSWER.propertyOptionsField].value = values;
              filterFields[CREATE_ANSWER.propertyOptionsField].hidden = false;

              const config = {
                ...filterFields[CREATE_ANSWER.propertyOptionsField].config
              };
              config.options = this.findProperty(
                propertyId,
                groupId
              ).propertyOptions;
              filterFields[CREATE_ANSWER.propertyOptionsField].config = config;
            } else {
              filterFields.maxField.value =
                newFilters[groupId][propertyId].filters[0].maxPropertyValue;
              filterFields.minField.value =
                newFilters[groupId][propertyId].filters[0].minPropertyValue;
              filterFields.suffixField.value =
                newFilters[groupId][propertyId].filters[0].suffix;
            }

            const filterObject = {
              id: idGenerator(),
              fields: filterFields
            };
            this.setFilterName(filterObject, filterFields);
            stateFilters.push(filterObject);
          }
        }
      }
    }

    return stateFilters;
  };

  reorderAnswer = async (answerIndex, otherAnswerIndex) => {
    if (
      otherAnswerIndex < 0 ||
      otherAnswerIndex > this.state.answers.length - 1
    ) {
      return;
    }

    let answers = [...this.state.answers];
    const copyAnswer = { ...answers[answerIndex] };
    const otherAnswer = { ...answers[otherAnswerIndex] };

    answers[answerIndex] = otherAnswer;
    answers[otherAnswerIndex] = copyAnswer;

    const sendData = [];
    for (let ind = 0; ind < answers.length; ind++) {
      sendData.push({
        id: answers[ind].id,
        order: ind + 1
      });
    }

    try {
      await axios.put(
        stringReplace(URLS.put.reorder, [
          { key: '{advisorId}', value: this.props.activeAdviser },
          { key: '{questionId}', value: this.props.activeQuestion.id }
        ]),
        { answers: [...sendData] },
        { errorMsg: translations.fetchPropertyGroupsError }
      );

      this.setState({ answers: answers });
    } catch (error) {
      console.error(error);
      this.handleError(error);
    }
  };

  deleteFilter = filterId => {
    const fields = { ...this.state.formFields };
    let filters = [...fields.filters];
    filters = filters.filter(element => element.id !== filterId);
    fields.filters = filters;
    this.setState({ formFields: fields });
  };

  filterFieldChange = (event, filterId, fieldType) => {
    const fields = { ...this.state.formFields };
    const filters = [...fields.filters];

    const filterIdx = filters.findIndex(element => element.id === filterId);
    const copyFilter = { ...filters[filterIdx] };

    const copyFilterFields = { ...copyFilter.fields };

    const copyFilterField = { ...copyFilterFields[fieldType] };
    copyFilterField.value = this.getFilterFieldValue(fieldType, event);
    copyFilterFields[fieldType] = copyFilterField;
    const newFields = this.addFilterFields(
      copyFilter,
      copyFilterFields,
      fieldType
    );

    this.clearFilterFields(fieldType, newFields);
    this.setFilterFieldOptions(fieldType, newFields);
    this.setFilterName(copyFilter, newFields);
    copyFilter.fields = newFields;
    filters[filterIdx] = copyFilter;
    fields.filters = filters;
    this.setState({ formFields: fields });
  };

  addFilterFields = (filter, filterFields, fieldType) => {
    if (
      fieldType === CREATE_ANSWER.propertyField ||
      fieldType === CREATE_ANSWER.propertyGroupField
    ) {
      const propertyField = { ...filterFields[CREATE_ANSWER.propertyField] };
      const propertyGroupField = { ...filterFields.propertyGroupField };
      let copyFields = {
        propertyGroupField: { ...propertyGroupField },
        propertyField: { ...propertyField }
      };

      if (fieldType === CREATE_ANSWER.propertyField) {
        const selectedProperty = propertyField.config.options.find(
          el => el.id === +propertyField.value
        );
        if (selectedProperty.type !== CREATE_ANSWER.menuFilter) {
          copyFields.minField = { ...minField };
          copyFields.maxField = { ...maxField };
          copyFields.suffixField = { ...suffixField };
        } else {
          copyFields.propertyOptionsField = { ...propertyOptionsField };
        }
      }
      return { ...copyFields };
    }
    return filterFields;
  };

  setFilterName = (filter, filterFields) => {
    const propertyGroupField = {
      ...filterFields[CREATE_ANSWER.propertyGroupField]
    };
    const propertyGroup = propertyGroupField.config.options.find(
      el => el.id === +propertyGroupField.value
    );
    const propertyField = { ...filterFields[CREATE_ANSWER.propertyField] };
    const property = propertyField.config.options.find(
      el => el.id === +propertyField.value
    );

    const propertyGroupText = propertyGroup ? ` - ${propertyGroup.name}` : '';
    const propertyText = property ? ` (${property.name})` : '';
    filter.name = `Filter${propertyGroupText}${propertyText}`;
  };

  getFilterFieldValue = (filterType, event) => {
    switch (filterType) {
      case CREATE_ANSWER.propertyOptionsField:
        const arr = [];
        event.forEach(el => {
          arr.push(el.value);
        });
        return arr;
      default:
        return event.target.value;
    }
  };

  setFilterFieldOptions = (fieldType, filterFields) => {
    const propertyField = { ...filterFields[CREATE_ANSWER.propertyField] };
    const propertyOptionsField =
      filterFields[CREATE_ANSWER.propertyOptionsField];
    const propertyGroupField = {
      ...filterFields[CREATE_ANSWER.propertyGroupField]
    };

    switch (fieldType) {
      case CREATE_ANSWER.propertyGroupField:
        if (propertyGroupField.value) {
          const config = { ...propertyField.config };
          config.options = this.findPropertyGroup(
            propertyGroupField.value
          ).properties;

          propertyField.config = config;
        }
        propertyField.hidden = !propertyGroupField.value;
        if (propertyOptionsField) {
          propertyOptionsField.hidden = !propertyField.value;
        }
        break;
      case CREATE_ANSWER.propertyField:
        if (propertyOptionsField) {
          if (propertyField.value) {
            const config = { ...propertyOptionsField.config };
            config.options = this.findProperty(
              propertyField.value,
              propertyGroupField.value
            ).propertyOptions;
            propertyOptionsField.config = config;
          }
          propertyOptionsField.hidden = !propertyField.value;
        }
        break;
      default:
        break;
    }

    filterFields[CREATE_ANSWER.propertyGroupField] = propertyGroupField;
    filterFields[CREATE_ANSWER.propertyField] = propertyField;
    if (propertyOptionsField) {
      filterFields[CREATE_ANSWER.propertyOptionsField] = propertyOptionsField;
    }
  };

  findPropertyGroup = groupId => {
    return this.state.propertyGroups.find(el => {
      return el.id === groupId;
    });
  };

  findProperty = (propertyId, groupId) => {
    return this.findPropertyGroup(groupId).properties.find(
      el => el.id === +propertyId
    );
  };

  clearFilterFields = (fieldType, copyFilterFields) => {
    const propertyField = { ...copyFilterFields[CREATE_ANSWER.propertyField] };
    const propertyOptionsField =
      copyFilterFields[CREATE_ANSWER.propertyOptionsField];
    switch (fieldType) {
      case CREATE_ANSWER.propertyGroupField:
        propertyField.value = '';
        if (propertyOptionsField) {
          propertyOptionsField.value = '';
        }
        break;
      case CREATE_ANSWER.propertyField:
        if (propertyOptionsField) {
          propertyOptionsField.value = '';
        }
        break;
      default:
        break;
    }
    copyFilterFields[CREATE_ANSWER.propertyField] = propertyField;
    if (propertyOptionsField) {
      copyFilterFields[
        CREATE_ANSWER.propertyOptionsField
      ] = propertyOptionsField;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showOverview !== this.state.showOverview) {
      if (this.state.showOverview) {
        this.fetchAllAnswers();
      }
    }
  }

  componentDidMount() {
    this.setState({ showOverview: this.props.showOverview });
    this.fetchPropertyGroups();
  }

  fetchPropertyGroups = async () => {
    try {
      const response = await axios.get(
        stringReplace(URLS.get.filters, [
          { key: '{advisorId}', value: this.props.activeAdviser },
          { key: '{questionId}', value: this.props.activeQuestion.id }
        ]),
        {
          params: {},
          errorMsg: translations.fetchPropertyGroupsError
        }
      );
      this.setPropertyGroups(response.data);
    } catch (error) {
      console.error(error);
      this.handleError(error);
    }
  };

  setPropertyGroups = propertyGroups => {
    propertyGroups.forEach(group => {
      group.id = group.id + group.name;
      group.properties.forEach(property => {
        property.propertyOptions.forEach(option => {
          const id = option.id;
          if (id) {
            option.value = id;
          }
        });
      });
    });

    this.setState({
      propertyGroups: propertyGroups
    });
  };

  fetchAllAnswers = async () => {
    try {
      const response = await axios.get(
        stringReplace(URLS.get.answers, [
          { key: '{advisorId}', value: this.props.activeAdviser },
          { key: '{questionId}', value: this.props.activeQuestion.id }
        ]),
        {
          params: {},
          errorMsg: translations.fetchPropertyGroupsError
        }
      );
      const answers = [...response.data];
      answers.forEach(el => {
        el.showWarning = false;
      });
      this.setState({ answers: answers });
    } catch (error) {
      console.error(error);
      this.handleError(error);
    }
  };

  showDeactivateWarning = answerId => {
    this.toggleWarning(true, answerId);
  };

  closeDeactivateWarning = answerId => {
    this.toggleWarning(false, answerId);
  };

  deactivateAnswer = answerId => {
    this.updateIsAnswerActive(answerId, false);
  };

  toggleWarning = (showWarning, answerId) => {
    const answers = [...this.state.answers];
    let answerIndex = answers.findIndex(element => element.id === answerId);
    const answerCopy = { ...answers[answerIndex] };
    answerCopy.showWarning = showWarning;
    answers[answerIndex] = answerCopy;
    this.setState({ answers: answers });
  };

  addQuestionImageClass = () => {
    switch (this.props.activeQuestion.answerType.id) {
      case QUESTION.typeCheckbox:
        return styles.QuestionCheckbox;
      case QUESTION.typeRadio:
        return styles.QuestionRadio;
      case QUESTION.typeSlider:
        return styles.QuestionSlider;
      default:
        break;
    }
  };

  validateFilters = () => {
    let valid = true;

    this.state.formFields.filters.forEach(filter => {
      Object.keys(filter.fields).forEach(field => {
        const value = filter.fields[field].value;
        if (!value || (Array.isArray(value) && value.length < 1)) {
          valid = false;
        }
      });
    });
    return valid;
  };

  handleError = (error, title) => {
    this.setState(
      prevState => {
        const newInfoMsg = {
          success: false,
          title: title || 'Error',
          content: error.response.data.errors
        };
        if (
          error.response.data.errors.find(
            el => el.indexOf(IMAGE_ERROR_KEY) !== -1
          )
        ) {
          const newFormData = { ...this.state.formFields };
          const newAnswerFieldsData = [...newFormData.answerFields];
          newAnswerFieldsData.forEach((element, index) => {
            const elementCopy = { ...element };
            if (elementCopy.key === CREATE_ANSWER.imageField) {
              elementCopy.imageName = '';
              elementCopy.value = '';
              newAnswerFieldsData[index] = elementCopy;
            }
          });
          newFormData.answerFields = [...newAnswerFieldsData];
          return {
            ...prevState,
            showMsg: true,
            infoMsg: { ...newInfoMsg },
            formFields: newFormData
          };
        } else {
          return {
            ...prevState,
            showMsg: true,
            infoMsg: { ...newInfoMsg }
          };
        }
      },
      () => setTimeout(() => this.setState({ showMsg: false }), 3000)
    );
  };

  getQuestionPublicNameSuffix = () => {
    switch (this.props.activeQuestion.answerType.id) {
      case QUESTION.typeCheckbox:
        return translations.questionTitleSuffixCheckBox;
      case QUESTION.typeRadio:
        return translations.questionTitleSuffixRadio;
      case QUESTION.typeSlider:
        return translations.questionTitleSuffixSlider;
      default:
        break;
    }
  };

  render() {
    const invalidElement = this.state.formFields.answerFields.find(el => {
      return el.error === true || (el.required && !el.value);
    });

    const filtersFieldsValid = this.validateFilters();
    const formFieldsValid = !invalidElement;
    const isFormValid = formFieldsValid && filtersFieldsValid;

    const disableCreateAnswerButton = !isFormValid;

    const proceedButton = !this.state.showOverview ? (
      <ActionButton
        disabled={disableCreateAnswerButton}
        type={BUTTON_TYPES.submit}
        title={translations.newAnswerButton}
        addClass={ACTION_BUTTON_ORANGE}
      />
    ) : null;

    let newAnswerFooter = undefined;
    if (this.state.showOverview) {
      newAnswerFooter =
        this.isSlider && this.state.answers.length >= 1 ? (
          <div className={styles.FooterDummy} />
        ) : (
          <PlusButtonSmall
            text={translations.addNewAnswerText}
            click={this.showNewAnswerView}
          />
        );
    }

    const content = this.state.showOverview ? (
      <AnswersOverview
        questionType={this.props.activeQuestion.answerType.id}
        closeDeactivateWarning={this.closeDeactivateWarning}
        deactivateAnswer={this.deactivateAnswer}
        showDeactivateWarning={this.showDeactivateWarning}
        answers={this.state.answers}
        updateIsAnswerActive={this.updateIsAnswerActive}
        deleteAnswer={this.deleteAnswer}
        editAnswer={this.editAnswer}
        reorderAnswer={this.reorderAnswer}
        activeAdviser={this.props.activeAdviser}
      />
    ) : (
      <Fragment>
        {this.state.showMsg ? (
          <InfoMessage
            success={this.state.infoMsg.success}
            infoMsg={{
              success: this.state.infoMsg.success,
              title: this.state.infoMsg.title,
              details: this.state.infoMsg.content
            }}
          />
        ) : null}
        <NewAnswer
          questionType={this.props.activeQuestion.answerType}
          isSlider={this.isSlider}
          addFilter={this.addFilter}
          filterFieldChange={this.filterFieldChange}
          deleteFilter={this.deleteFilter}
          changed={this.formElementChangedHandler}
          formFields={this.state.formFields}
          emptyLabel={translations.emptyFilePickerLabel}
        />
      </Fragment>
    );
    return (
      <Form
        onFormSubmit={this.submitFormHandler}
        onAfterSubmit={this.onAfterSubmit}
      >
        <Modal
          contentHeight="80vh"
          width="72%"
          title={translations.modalTitle}
          proceedButton={proceedButton}
          afterModalClose={this.props.onModalClose}
          show={this.props.show}
          buttons={newAnswerFooter}
          overflowY={this.props.overflowY}
        >
          <div className={styles.ContentWrapper}>
            <div className={styles.QuestionTitle}>
              <span
                className={`${
                  styles.GroupImage
                } ${this.addQuestionImageClass()}`}
              />
              {this.props.activeQuestion.publicName}&nbsp;({this.getQuestionPublicNameSuffix()})
            </div>
            {content}
          </div>
        </Modal>
      </Form>
    );
  }
}

export default withProviderConsumer(NewAnswerModal, [
  'activeAdviser',
  'dispatch'
]);
