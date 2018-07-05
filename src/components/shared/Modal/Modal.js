import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.scss';
import Backdrop from '../Backdrop/Backdrop';
import ActionButton from '../ActionButton/ActionButton';
import { ACTION_BUTTON_WHITE } from '../../../constants/constants';
import { common as translations } from '../../../translations/translations';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show
    };
  }

  closeModal = () => {
    this.setState({ show: false }, this.props.afterModalClose);
  };

  render() {
    let modalClasses = [classes.Modal];

    if (this.state.show) {
      modalClasses.push(classes.Open);
    }

    return (
      <div>
        <Backdrop show={this.state.show} clicked={this.closeModal} />
        <div className={modalClasses.join(' ')}>
          <div className={classes.Close} onClick={this.closeModal} />
          <div className={classes.Title}>
            <h3>{this.props.title}</h3>
          </div>
          <div className={classes.Content}>{this.props.children}</div>
          {!this.props.hideBtn && (
            <div className={classes.Buttons}>
              <div className={classes.Cancel}>
                <ActionButton
                  title={translations.cancel}
                  clicked={this.closeModal}
                  addClass={ACTION_BUTTON_WHITE}
                />
              </div>
              <div className={classes.Proceed}>{this.props.proceedButton}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  hideBtn: PropTypes.bool,
  proceedButton: PropTypes.element,
  afterModalClose: PropTypes.func
};

export default Modal;
