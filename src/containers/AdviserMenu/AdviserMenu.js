import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AdviserItem from '../../components/AdviserMenu/AdviserItem/AdviserItem';
import AdviserCreateItem from '../../components/AdviserMenu/AdviserCreateItem/AdviserCreateItem';
import classes from './AdviserMenu.scss';
import * as actionCreators from '../../store/actions';
import { adviserMenu, common } from '../../translations/translations';
import axios from '../../services/axios';
import withProviderConsumer from '../../hoc/withProviderConsumer/withProviderConsumer';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Modal from '../../components/shared/Modal/Modal';
import ActionButton from '../../components/shared/ActionButton/ActionButton';
import Loader from '../../components/shared/Loader/Loader';
import { ACTION_BUTTON_WHITE_ORANGE } from '../../constants/constants';
import InfoMessage from '../../components/shared/InfoMessage/InfoMessage';
import ROUTES from '../../constants/urls';
import { ADVISOR } from '../../constants/backendUrls';
import { stringReplace } from '../../services/helpers';

const translations = { ...adviserMenu, ...common };
const URLS = { ...ROUTES, ...ADVISOR };

export class AdviserMenu extends PureComponent {
  state = {
    canShowModal: false,
    itemId: null,
    isListFetched: false,
    showModal: true,
    showMsg: false,
    infoMsg: {
      success: false,
      details: ''
    }
  };

  componentDidMount() {
    this.fetchAdviserListData();
    this.props.dispatch(actionCreators.addAdviserId(''));
    this.checkForSuccessfulyCreatedAdviser();
    window.scrollTo(0, 0);
    this.props.dispatch(actionCreators.showPromptModal(''));
    this.props.dispatch(actionCreators.checkForEditedForm(false));
  }

  componentWillUnmount() {
    window.scrollTo(0, 0);
  }

  fetchAdviserListData = async () => {
    try {
      const response = await axios.get(URLS.get.advisors, {
        params: {},
        errorMsg: translations.adviserListErrorMsg
      });

      this.setState({ isListFetched: true });

      if (response.data && response.data.length) {
        this.props.dispatch(actionCreators.createAdviserList(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  getAdviser = id => {
    this.props.dispatch(
      actionCreators.addAdviserId(id, () => {
        this.props.history.push(`${URLS.mainData}/${id}`);
      })
    );
  };

  deleteAdvisor = async id => {
    this.setState({ itemId: id });
    try {
      await axios.delete(`${URLS.delete.advisor}${id}`, {
        params: {},
        errorMsg: translations.adviserDeleteErrorMsg
      });

      this.props.dispatch(
        actionCreators.removeAdviser(this.state.itemId, this.resetRemoveAdviser)
      );
    } catch (error) {
      console.error(error);
    }
  };

  removeAdviser = (id, title) => {
    this.setState({
      canShowModal: true,
      itemId: id,
      adviserToBeDeleted: title
    });
  };

  resetRemoveAdviser = () => {
    this.setState({ canShowModal: false, itemId: null });
  };

  closeErrorModal = () => {
    this.setState({ canShowModal: false });
  };

  clearMessage = () => {
    setTimeout(() => {
      this.setState({ showMsg: false }, () =>
        this.props.dispatch(actionCreators.clearTitle())
      );
    }, 3000);
  };

  checkForSuccessfulyCreatedAdviser = () => {
    if (this.props.title) {
      const newBeraterTitle = adviserMenu.successfullyCreatedAdviserMsg.replace(
        '<Berater Name>',
        this.props.title
      );
      this.setState(prevState => {
        const infoMsg = {
          success: true,
          details: newBeraterTitle
        };
        return {
          ...prevState,
          showMsg: true,
          infoMsg: infoMsg
        };
      }, this.clearMessage());
    }
  };

  render() {
    const content = (
      <div className={classes.AdviserMenu}>
        <div className={classes.Title}>{translations.title}</div>
        {this.state.showMsg ? (
          <InfoMessage
            success={this.state.infoMsg.success}
            infoMsg={this.state.infoMsg}
          />
        ) : null}
        <div className={classes.AdviserList}>
          {this.props.adviserList.map((adviserItem, index) => {
            return (
              <AdviserItem
                key={adviserItem.key}
                id={adviserItem.id}
                title={adviserItem.title}
                isActive={adviserItem.isActive}
                image={adviserItem.image}
                removeAdviser={this.removeAdviser.bind(
                  this,
                  adviserItem.id,
                  adviserItem.title
                )}
                getAdviser={this.getAdviser.bind(this, adviserItem.id)}
              />
            );
          })}
          <AdviserCreateItem />
          {this.state.canShowModal && (
            <Modal
              title={stringReplace(translations.confirmRemoveAdviserTitle, [
                {
                  key: '{Berater_name}',
                  value: this.state.adviserToBeDeleted
                }
              ])}
              show={this.state.showModal}
              afterModalClose={this.closeErrorModal.bind(this)}
              proceedButton={
                <div className={classes.ActionBtnWrapper}>
                  <ActionButton
                    title={translations.confirmRemoveButton}
                    addClass={ACTION_BUTTON_WHITE_ORANGE}
                    clicked={() => {
                      this.deleteAdvisor(this.state.itemId);
                    }}
                  />
                </div>
              }
            >
              <div className={classes.ConfirmMessage}>
                {stringReplace(translations.confirmRemoveAdviser, [
                  {
                    key: '{Berater_name}',
                    value: this.state.adviserToBeDeleted
                  }
                ])}
              </div>
            </Modal>
          )}
        </div>
      </div>
    );

    return this.state.isListFetched ? content : <Loader />;
  }
}

AdviserMenu.propTypes = {
  adviserList: PropTypes.array,
  dispatch: PropTypes.func,
  wasAdviserListUpdated: PropTypes.bool
};

export default withErrorHandler(
  withProviderConsumer(AdviserMenu, [
    'adviserList',
    'dispatch',
    'activeAdviser',
    'title',
    'showPromptModal'
  ]),
  axios
);
