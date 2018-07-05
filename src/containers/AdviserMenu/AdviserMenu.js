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
import { ACTION_BUTTON_ORANGE } from '../../constants/constants';
import URLS from '../../constants/urls';

const translations = { ...adviserMenu, ...common };

export class AdviserMenu extends PureComponent {
  state = {
    canShowModal: false,
    itemId: null,
    isListFetched: false
  };

  componentDidMount() {
    this.fetchAdviserListData();
  }

  componentWillUnmount() {
    window.scrollTo(0, 0);
  }

  fetchAdviserListData = async () => {
    try {
      //  /admin/advisors
      const response = await axios.get('/', {
        params: {},
        errorMsg: translations.adviserListErrorMsg
      });
      this.setState(() => {
        return {
          isListFetched: true
        };
      });
      if (response.data && response.data.length) {
        this.props.dispatch(actionCreators.createAdviserList(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  getAdviser = async id => {
    this.props.history.push(`${URLS.mainData}/${id}`);
  };

  deleteAdvisor = async id => {
    try {
      await axios.delete(`/admin/advisor/${id}`, {
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

  removeAdviser = id => {
    this.setState({ canShowModal: true, itemId: id });
  };

  resetRemoveAdviser = () => {
    this.setState({ canShowModal: false, itemId: null });
  };

  render() {
    const content = (
      <div className={classes.AdviserMenu}>
        <div className={classes.Title}>{translations.title}</div>
        <div className={classes.AdviserList}>
          {this.props.adviserList.map((adviserItem, index) => {
            return (
              <AdviserItem
                key={adviserItem.key}
                title={adviserItem.title}
                isActive={adviserItem.isActive}
                image={adviserItem.image}
                removeAdviser={this.removeAdviser.bind(this, adviserItem.id)}
                getAdviser={this.getAdviser.bind(this, adviserItem.id)}
              />
            );
          })}
          <AdviserCreateItem />
          {this.state.canShowModal && (
            <Modal
              title={translations.confirmRemoveAdviserTitle}
              show={true}
              proceedButton={
                <div className={classes.ActionBtnWrapper}>
                  <ActionButton
                    title={translations.confirm}
                    addClass={ACTION_BUTTON_ORANGE}
                    clicked={() => {
                      this.deleteAdvisor(this.state.itemId);
                    }}
                  />
                </div>
              }
            >
              <div className={classes.ConfirmMessage}>
                {translations.confirmRemoveAdviser}
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
    'wasAdviserListUpdated'
  ]),
  axios
);
