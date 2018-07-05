import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import classes from './AdviserInfoNavBar.scss';
import { adviserInfoNavBar as translations } from '../../../translations/translations';
import URLS from '../../../constants/urls';

const AdviserInfoNavBar = props => {
  return (
    <div className={classes.NavBar}>
      <NavLink activeClassName={classes.Active} exact to={URLS.mainData}>
        {translations.baseData}
      </NavLink>
      <NavLink
        activeClassName={classes.Active}
        to={`${props.match.url}${URLS.allQuestions}`}
      >
        {translations.allQuestions}
      </NavLink>
      <NavLink
        activeClassName={classes.Active}
        to={`${props.match.url}${URLS.questionnaireTree}`}
      >
        {translations.questionnaireTree}
      </NavLink>
    </div>
  );
};

export default withRouter(AdviserInfoNavBar);
