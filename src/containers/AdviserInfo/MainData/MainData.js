import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import classes from './MainData.scss';
import MainDataBlock from '../../../components/AdviserInfo/MainDataBlock/MainDataBlock';
import * as actionCreators from '../../../store/actions/index';
import mainDataState from './MainDataState';
import { mainDataBlocks, common } from '../../../translations/translations';
import ActionButton from '../../../components/shared/ActionButton/ActionButton';
import Loader from '../../../components/shared/Loader/Loader';
import {
  ACTION_BUTTON_WHITE,
  ACTION_BUTTON_ORANGE,
  BUTTON_TYPES
} from '../../../constants/constants';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../services/axios';
import withProviderConsumer from '../../../hoc/withProviderConsumer/withProviderConsumer';
import URLS from '../../../constants/urls';

const translations = { ...mainDataBlocks, ...common };

class MainData extends PureComponent {
  state = {
    ...mainDataState,
    id: '',
    isEditedDataFetched: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.addCategories();
    if (this.props.edit) {
      const location = window.location.pathname.split('/');
      this.getAdviser(location[location.length - 1]);
      this.setState(() => {
        return { id: location[location.length - 1] };
      });
    }
    if (!this.props.edit) {
      const initialFormData = {
        name: '',
        category: 1,
        url: '',
        title: '',
        description: '',
        index: false,
        follow: false
      };
      const newState = { ...this.state.formFields };
      Object.keys(newState).forEach(fieldName => {
        newState[fieldName].forEach((field, index) => {
          field.value = initialFormData[field.key];
        });
      });
      this.setState(() => {
        return {
          formFields: { ...newState }
        };
      });
    }
  }

  componentWillUnmount() {
    window.scrollTo(0, 0);
  }

  formElementChangedHandler = (event, elementIdentifier, blockIdentifier) => {
    const updatedFormData = {
      ...this.state.formFields
    };
    const blockUpdated = [...updatedFormData[blockIdentifier]];
    const originalElInd = blockUpdated.findIndex(
      element => element.key === elementIdentifier
    );
    const originalElement = blockUpdated[originalElInd];
    const elementChanged = { ...originalElement };

    elementChanged.value =
      elementChanged.elementType === BUTTON_TYPES.checkbox
        ? !elementChanged.value
        : event.target.value;
    blockUpdated[originalElInd] = elementChanged;
    updatedFormData[blockIdentifier] = blockUpdated;

    this.setState({ formFields: updatedFormData });
  };

  addCategories = async () => {
    try {
      const response = await axios.get('/admin/advisor/categories', {
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
      console.log(error);
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
      seoFollow: formData.follow
    };
    try {
      await axios.post(
        '/admin/advisor',
        { ...advisorData },
        { errorMsg: translations.addAdviserErrorMsg }
      );
      if (formData.name) {
        this.props.dispatch(
          actionCreators.addAdviser(
            formData.name,
            this.navigateToSwitch.bind(this)
          )
        );
      }
    } catch (error) {
      console.error(error);
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
      seoFollow: adviser.follow
    };
    try {
      await axios.put(
        `/admin/advisor/${id}`,
        { ...advisorData },
        {
          errorMsg: translations.editAdvisorErrorMsg
        }
      );
      this.navigateToSwitch();
    } catch (error) {
      console.log(error);
    }
  };
  getAdviser = async id => {
    try {
      let newFormData;
      await axios
        .get(
          `/admin/advisor/${id}`,
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
            follow: advisorData.seoFollow
          };
        });
      this.setState(() => {
        const newState = { ...this.state.formFields };
        Object.keys(newState).forEach(fieldName => {
          newState[fieldName].forEach((field, index) => {
            field.value = newFormData[field.key];
          });
        });
        return {
          formFields: { ...newState },
          isEditedDataFetched: true
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  navigateToSwitch = () => this.props.history.push(URLS.root);

  submitFormHandler = (event, dispatch) => {
    event.preventDefault();

    const formData = {};

    Object.keys(this.state.formFields).forEach(fieldName => {
      this.state.formFields[fieldName].forEach((field, index) => {
        formData[field.key] = field.value;
      });
    });
    this.props.edit
      ? this.editAdviser(this.state.id, formData)
      : this.addAdviser(formData);
  };

  render() {
    const content = (
      <div className={classes.MainData}>
        <form onSubmit={e => this.submitFormHandler(e)}>
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
                navigateTo={true}
                route={URLS.root}
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
        </form>
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

export default withRouter(
  withErrorHandler(withProviderConsumer(MainData, ['dispatch']), axios)
);
