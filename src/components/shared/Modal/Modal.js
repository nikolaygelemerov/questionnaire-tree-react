import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import classes from './Modal.scss';
import Backdrop from '../Backdrop/Backdrop';
import ActionButton from '../ActionButton/ActionButton';
import { ACTION_BUTTON_WHITE, BACKDROP } from '../../../constants/constants';
import { common as translations } from '../../../translations/translations';

class Modal extends Component {
  closeModal = event => {
    if (this.props.afterModalClose) {
      this.props.afterModalClose(event);
    }
  };

  render() {
    let modalClasses = [classes.Modal];
    if (this.props.show) {
      modalClasses.push(classes.Open);
    }
    if (this.props.classWidth) {
      modalClasses.push(this.props.classWidth);
    }

    let secondaryTitle = this.props.secondaryTitle ? (
      <span className={classes.SecondaryTitle}>
        {this.props.secondaryTitle}{' '}
        {this.props.secondaryTitleRequired ? (
          <span className={classes.Required}>*</span>
        ) : null}
      </span>
    ) : null;

    const modalStyle = {
      width: this.props.width
    };
    const contentStyle = {
      overflowY: this.props.overflowY,
      height: this.props.contentHeight
    };

    const buttons =
      typeof this.props.buttons !== 'undefined' ? (
        this.props.buttons
      ) : (
        <Fragment>
          <div className={classes.Cancel}>
            <ActionButton
              title={translations.cancel}
              clicked={this.closeModal}
              addClass={ACTION_BUTTON_WHITE}
            />
          </div>

          <div className={classes.Proceed}>{this.props.proceedButton}</div>
          {this.props.proceedWithoutSave ? (
            <div className={classes.Link}>
              <Link
                className={classes.Link}
                to={this.props.withoutSaveRoute}
                onClick={this.props.proceedWithoutSave}
              >
                {translations.dontSave}
              </Link>
            </div>
          ) : null}
        </Fragment>
      );

    return (
      <div>
        <Backdrop
          type={BACKDROP}
          show={this.props.show}
          clicked={this.closeModal}
        />
        <div className={modalClasses.join(' ')} style={modalStyle}>
          <div className={classes.Close} onClick={this.closeModal} />
          <div className={classes.Title}>
            <div>
              {this.props.title} {secondaryTitle}
            </div>
          </div>
          <div className={classes.Content} style={contentStyle}>
            {this.props.children}
          </div>
          <div className={classes.Buttons}>{buttons}</div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  hideBtn: PropTypes.bool,
  proceedButton: PropTypes.element,
  afterModalClose: PropTypes.func
};

export default Modal;
