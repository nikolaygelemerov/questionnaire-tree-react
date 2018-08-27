import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './AdviserItem.scss';
import axios from '../../../services/axios';
import buttons from '../../../styles/_buttons.scss';
import items from '../../../styles/components/_switch-item.scss';
import Checkbox from '../../shared/Checkbox/Checkbox';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { idStringReplace } from '../../../services/helpers';
import { ADVISOR as URLS } from '../../../constants/backendUrls';

class AdviserItem extends Component {
  state = { isChecked: this.props.isActive };

  updateCheckBoxHandler = async () => {
    const newState = {
      isActive: !this.state.isChecked
    };
    const requestUrl = idStringReplace(URLS.put.changeState, this.props.id);
    try {
      await axios.put(requestUrl, newState, {
        errorMsg: 'Cannot put content'
      });
      this.setState(prevState => {
        return { isChecked: !prevState.isChecked };
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className={`${items.SwitchItem} ${classes.AdviserItem}`}>
        <div className={items.Content}>
          <div className={`${items.Image} ${classes.Image}`}>
            <div
              className={`${items.ImageContent} ${classes.ImageContent}`}
              onClick={this.props.getAdviser}
            />
          </div>
          <div className={items.Title}>{this.props.title}</div>
        </div>
        <div className={items.Footer}>
          <Checkbox
            updateCheckBoxHandler={this.updateCheckBoxHandler}
            isChecked={this.state.isChecked}
          />
          <div className={`${items.EditWrapper} ${classes.EditWrapper}`}>
            <div className={buttons.Edit} onClick={this.props.getAdviser} />
            {!this.state.isChecked && (
              <div
                className={buttons.Delete}
                onClick={this.props.removeAdviser}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

AdviserItem.propTypes = {
  title: PropTypes.string,
  removeAdviser: PropTypes.func
};

export default withErrorHandler(AdviserItem, axios);
