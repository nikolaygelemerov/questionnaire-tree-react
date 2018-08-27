import React, { PureComponent, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import classes from './AdviserInfoNavBar.scss';
import { adviserInfoNavBar as translations } from '../../../translations/translations';
import URLS from '../../../constants/urls';
import { NAVBAR, ADVISER_INFO_NAVBAR } from '../../../constants/constants';
import withProviderConsumer from '../../../hoc/withProviderConsumer/withProviderConsumer';
import * as actionCreators from '../../../store/actions';

class AdviserInfoNavBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      positionTop: ADVISER_INFO_NAVBAR.positionTop
    };
  }
  componentDidMount() {
    let positionTop = ADVISER_INFO_NAVBAR.positionTop;
    window.addEventListener('scroll', () => {
      if (
        window.scrollY > NAVBAR.positionTop &&
        positionTop !== ADVISER_INFO_NAVBAR.positionScrolled
      ) {
        positionTop = ADVISER_INFO_NAVBAR.positionScrolled;
        this.setState({ positionTop: ADVISER_INFO_NAVBAR.positionScrolled });
      } else {
        if (
          window.scrollY <= NAVBAR.positionTop &&
          positionTop !== ADVISER_INFO_NAVBAR.positionTop
        ) {
          positionTop = ADVISER_INFO_NAVBAR.positionTop;
          this.setState({ positionTop: ADVISER_INFO_NAVBAR.positionTop });
        }
      }
    });
  }

  showModal = linkTo => {
    if (this.props.isFormEdited) {
      this.props.dispatch(actionCreators.showPromptModal(linkTo));
    }
  };
  render() {
    const defaultNavBar = (
      <div className={classes.NavBar} style={{ top: this.state.positionTop }}>
        <NavLink
          activeClassName={classes.Active}
          exact
          to={`${URLS.mainData}/${this.props.activeAdviser || ''}`}
        >
          {translations.baseData}
        </NavLink>
        {this.props.activeAdviser ? (
          <Fragment>
            <NavLink
              activeClassName={classes.Active}
              to={`${this.props.match.url}${URLS.allQuestions}/${this.props
                .activeAdviser || ''}`}
            >
              {translations.allQuestions}
            </NavLink>
            <NavLink
              activeClassName={classes.Active}
              to={`${this.props.match.url}${URLS.questionnaireTree}/${this.props
                .activeAdviser || ''}`}
            >
              {translations.questionnaireTree}
            </NavLink>
          </Fragment>
        ) : null}
      </div>
    );
    const editedDataNavBar = (
      <div className={classes.NavBar}>
        <a className={classes.Active} onClick={this.showModal}>
          {translations.baseData}
        </a>
        {this.props.activeAdviser ? (
          <Fragment>
            <a
              onClick={this.showModal.bind(
                this,
                `${this.props.match.url}${URLS.allQuestions}/${this.props
                  .activeAdviser || ''}`
              )}
            >
              {translations.allQuestions}
            </a>
            <a
              onClick={this.showModal.bind(
                this,
                `${this.props.match.url}${URLS.questionnaireTree}/${
                  this.props.activeAdviser
                }`
              )}
            >
              {translations.questionnaireTree}
            </a>
          </Fragment>
        ) : null}
      </div>
    );
    return (
      <Fragment>
        {this.props.isFormEdited ? editedDataNavBar : defaultNavBar}
      </Fragment>
    );
  }
}

export default withRouter(
  withProviderConsumer(AdviserInfoNavBar, [
    'activeAdviser',
    'isFormEdited',
    'dispatch',
    'showPromptModal'
  ])
);
