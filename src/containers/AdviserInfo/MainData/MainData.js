import React from 'react';
import PropTypes from 'prop-types';

import classes from './MainData.scss';
import MainDataBlock from '../../../components/AdviserInfo/MainDataBlock/MainDataBlock';
import * as actionCreators from '../../../store/actions/index';
import mainDataState from './MainDataState';
import {
  mainDataBlocks,
  common,
  adviserMainData
} from '../../../translations/translations';
import ActionButton from '../../../components/shared/ActionButton/ActionButton';
import Loader from '../../../components/shared/Loader/Loader';
import InfoMessage from '../../../components/shared/InfoMessage/InfoMessage';
import {
  ACTION_BUTTON_WHITE,
  ACTION_BUTTON_ORANGE,
  BUTTON_TYPES,
  FORM_ELEMENT_TYPES,
  IMAGE_KEY,
  IMAGE_ERROR_KEY,
  INITIAL_BASIS_DATA
} from '../../../constants/constants';
import axios from '../../../services/axios';
import withProviderConsumer from '../../../hoc/withProviderConsumer/withProviderConsumer';
import ROUTES from '../../../constants/urls';
import { ADVISOR } from '../../../constants/backendUrls';
import Form from '../../../components/shared/Form/Form';
import Modal from '../../../components/shared/Modal/Modal';

const translations = { ...mainDataBlocks, ...common, ...adviserMainData };
const URLS = { ...ROUTES, ...ADVISOR };

class MainData extends Form {
  constructor(props) {
    super(props);
    this.form = React.createRef();
  }
  state = {
    ...mainDataState,
    id: '',
    isEditedDataFetched: false,
    showMsg: false,
    infoMsg: {
      success: false,
      title: '',
      content: ''
    },
    isFormEdited: false,
    editableElements: []
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.addCategories();
    this.props.dispatch(
      actionCreators.addAdviserId(this.props.match.params.id)
    );
    this.checkForEditableBerater();
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.isFormEdited !== this.state.isFormEdited) {
      this.props.dispatch(
        actionCreators.checkForEditedForm(this.state.isFormEdited)
      );
    }

    if (prevProp.activeAdviser !== this.props.activeAdviser) {
      this.checkForEditableBerater();
    }
  }

  checkForEditableBerater() {
    if (this.props.activeAdviser) {
      const id = this.props.activeAdviser;
      this.getAdviser(id);
      this.setState(() => {
        return { id };
      });
    }
    if (!this.props.activeAdviser) {
      const newState = { ...this.state.formFields };
      Object.keys(newState).forEach(fieldName => {
        newState[fieldName].forEach((field, index) => {
          if (field.key === IMAGE_KEY) {
            field.imageName = INITIAL_BASIS_DATA[field.key];
          }
          field.value = INITIAL_BASIS_DATA[field.key];
        });
      });
      this.setState(() => {
        return {
          formFields: { ...newState }
        };
      });
    }
  }

  onAfterSubmit = sendData => {
    this.addAdviser(sendData);
  };

  handleError = (error, title) => {
    this.setState(prevState => {
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
        const newBasisData = [...newFormData.basisData];
        newBasisData.forEach(element => {
          if (element.key === IMAGE_KEY) {
            element.imageName = '';
            element.value = '';
          }
        });
        newFormData.basisData = [...newBasisData];
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
    });
  };

  addCategories = async () => {
    try {
      const response = await axios.get(URLS.get.categories, {
        params: {},
        errorMsg: translations.addCategoryErrorMsg
      });
      this.setState(prevState => {
        let newBasisData = [...prevState.formFields.basisData];
        newBasisData[0].config.options = [...response.data];
        return {
          formFields: {
            ...prevState.formFields,
            basisData: [...newBasisData]
          }
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  addAdviser = async formData => {
    const advisorData = {
      name: formData.name,
      categoryId: +formData.category,
      url: formData.url,
      seoTitle: formData.title,
      seoDescription: formData.description,
      seoIsIndex: formData.index,
      seoFollow: formData.follow,
      image: formData.image || ''
    };
    try {
      const response = await axios.post(
        URLS.post.create,
        { ...advisorData },
        { errorMsg: translations.addAdviserErrorMsg }
      );
      if (response.data) {
        this.props.dispatch(
          actionCreators.addAdviser(
            formData.name,
            this.navigateToSwitch.bind(this, URLS.root)
          )
        );
      }
    } catch (error) {
      console.error(error);
      this.handleError(error, translations.errorMessageTitle);
    }
  };
  editAdviser = async (id, adviser) => {
    const advisorData = {
      name: adviser.name,
      categoryId: +adviser.category,
      url: adviser.url,
      seoTitle: adviser.title,
      seoDescription: adviser.description,
      seoIsIndex: adviser.index,
      seoFollow: adviser.follow,
      image: adviser.image || ''
    };

    try {
      await axios.put(
        `${URLS.put.edit.advisor}${id}`,
        { ...advisorData },
        {
          errorMsg: translations.editAdvisorErrorMsg
        }
      );
      this.navigateToSwitch(
        this.props.showPromptModal !== ''
          ? this.props.showPromptModal
          : URLS.root
      );
    } catch (error) {
      console.error(error);
      this.handleError(error, translations.errorMessageOnRquestFailed);
    }
  };
  getAdviser = async id => {
    try {
      let newFormData;
      await axios
        .get(
          `${URLS.get.advisor}${id}`,
          {},
          { errorMsg: translations.getAdviserErrorMsg }
        )
        .then(data => {
          const advisorData = data.data;
          newFormData = {
            name: advisorData.name,
            category: advisorData.categoryGroup.id,
            url: advisorData.url,
            title: advisorData.seoTitle,
            description: advisorData.seoDescription,
            index: advisorData.seoIsIndex,
            follow: advisorData.seoFollow,
            image: advisorData.image
          };
        });
      this.setState(() => {
        const newState = { ...this.state.formFields };
        Object.keys(newState).forEach(fieldName => {
          newState[fieldName].forEach((field, index) => {
            field.value = newFormData[field.key];
            if (field.elementType === FORM_ELEMENT_TYPES.filePicker) {
              field.imageName = newFormData[field.key];
            }
          });
        });
        return {
          formFields: { ...newState },
          isEditedDataFetched: true,
          initialState: { ...newFormData }
        };
      });
    } catch (error) {
      console.error(error);
      this.handleError(error, translations.errorMessageOnRquestFailed);
    }
  };

  navigateToSwitch = URL => {
    this.props.history.push(URL);
  };

  submitFormHandler = (event, dispatch) => {
    event.preventDefault();
    const formData = {};
    Object.keys(this.state.formFields).forEach(fieldName => {
      this.state.formFields[fieldName].forEach((field, index) => {
        formData[field.key] = field.value;
      });
    });

    this.state.id
      ? this.editAdviser(this.state.id, formData)
      : this.addAdviser(formData);
  };

  onPromptModalClose = event => {
    if (event.target.type === BUTTON_TYPES.submit) {
      this.props.dispatch(actionCreators.showPromptModal(''));
      this.props.dispatch(actionCreators.checkForEditedForm(false));
    } else {
      this.props.dispatch(actionCreators.showPromptModal(''));
    }
  };

  warningButtonSubmit = sendData => {
    this.submitFormHandler(sendData);
    this.onPromptModalClose({ target: { type: BUTTON_TYPES.submit } });
  };

  proceedWithoutSave = () => {
    this.props.dispatch(actionCreators.showPromptModal(''));
    this.props.dispatch(actionCreators.checkForEditedForm(false));
  };

  cancelAndNavToSwitch = () => {
    this.props.dispatch(actionCreators.showPromptModal(URLS.root));
  };

  render() {
    const content = (
      <div className={classes.MainData}>
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

        <Form
          onFormSubmit={this.submitFormHandler}
          onAfterSubmit={this.onAfterSubmit}
          ref={this.form}
        >
          {this.state.isFormEdited && this.props.showPromptModal ? (
            <Modal
              title={adviserMainData.promptModalTitle}
              classWidth={classes.ModalWrapper}
              proceedButton={
                <ActionButton
                  title={translations.saveButtonLabel}
                  type={BUTTON_TYPES.submit}
                  navigateTo={true}
                  clicked={this.warningButtonSubmit}
                  route={this.props.showPromptModal}
                  addClass={ACTION_BUTTON_ORANGE}
                />
              }
              withoutSaveRoute={this.props.showPromptModal}
              afterModalClose={this.onPromptModalClose}
              show={this.props.showPromptModal}
              proceedWithoutSave={this.proceedWithoutSave}
            >
              <span className={classes.WarningMessageContent}>
                {translations.promptModalContent}
              </span>
            </Modal>
          ) : null}
          <MainDataBlock
            title={translations.baseDataBlockTitle}
            secondaryTitle={translations.baseDataBlockSecondaryTitle}
            blockIdentifier={'basisData'}
            fields={this.state.formFields.basisData}
            changed={this.formElementChangedHandler}
          />
          <MainDataBlock
            title={translations.seoBlockTitle}
            blockIdentifier={'SEO'}
            fields={this.state.formFields.SEO}
            changed={this.formElementChangedHandler}
          />
          <div className={classes.Buttons}>
            <div className={classes.Cancel}>
              <ActionButton
                title={translations.cancel}
                type={BUTTON_TYPES.button}
                clicked={this.cancelAndNavToSwitch}
                navigateTo={!this.state.isFormEdited}
                route={this.props.showPromptModal || URLS.root}
                addClass={ACTION_BUTTON_WHITE}
              />
            </div>
            <div className={classes.Save}>
              <ActionButton
                type={BUTTON_TYPES.submit}
                title={translations.saveButtonLabel}
                addClass={ACTION_BUTTON_ORANGE}
              />
            </div>
          </div>
        </Form>
      </div>
    );
    return this.state.isEditedDataFetched || !this.props.edit ? (
      content
    ) : (
      <Loader />
    );
  }
}

MainData.propTypes = {
  dispatch: PropTypes.func
};

export default withProviderConsumer(MainData, [
  'activeAdviser',
  'dispatch',
  'showPromptModal'
]);
