import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Breadcrumbs.scss';
import URLS from '../../constants/urls';
import { idGenerator } from '../../helpers/helpers';
import { breadcrumbs as translations } from '../../translations/translations';

const urlMap = url => {
  switch (url) {
    case URLS.root:
      return translations.root;
    case URLS.mainData:
      return translations.mainData;
    case `${URLS.mainData}${URLS.allQuestions}`:
      return translations.questions;
    case `${URLS.mainData}${URLS.questionnaireTree}`:
      return translations.questionnaireTree;
    default:
      return '';
  }
};

const splitUrl = url => {
  let urls = url.split('/');

  if (urls[1] === '') {
    urls.pop();
  }

  return urls;
};

const Breadcrumbs = props => {
  let url = '';
  let title = '';

  const routeList = splitUrl(props.pathname).map((element, index) => {
    url += (index === 1 ? '' : '/') + element;
    title = urlMap(url);

    return (
      <NavLink
        activeClassName={classes.Active}
        exact
        key={idGenerator()}
        to={url}
      >
        {title}
      </NavLink>
    );
  });

  return (
    <div className={classes.Breadcrumbs}>
      <div className={classes.Nav}>{routeList}</div>
      <div className={classes.Title}>{title}</div>
    </div>
  );
};

export default Breadcrumbs;
