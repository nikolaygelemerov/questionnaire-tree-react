import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Breadcrumbs.scss';
import URLS from '../../constants/urls';
import { idGenerator } from '../../services/helpers';
import { breadcrumbs as translations } from '../../translations/translations';
import withProviderConsumer from '../../hoc/withProviderConsumer/withProviderConsumer';

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
  let breadcrumbsUrl = '';
  let breadcrumbsTitle = '';
  let mainTitle = '';

  const routeList = splitUrl(props.pathname).map((element, index) => {
    url += (index === 1 ? '' : '/') + element;
    title = urlMap(url);

    if (index !== 0 && props.activeAdviser) {
      breadcrumbsUrl = `${url}/${props.activeAdviser}`;
    } else {
      breadcrumbsUrl = url;
    }

    if (title) {
      breadcrumbsTitle = title;
      mainTitle = `${title} ${props.activeAdviser ? props.activeAdviser : ''}`;
    }

    return title ? (
      <NavLink
        activeClassName={classes.Active}
        exact
        key={idGenerator()}
        to={breadcrumbsUrl}
      >
        {breadcrumbsTitle}
      </NavLink>
    ) : null;
  });

  return (
    <div className={classes.Breadcrumbs}>
      <div className={classes.Nav}>{routeList}</div>
      <div className={classes.Title}>{mainTitle}</div>
    </div>
  );
};

export default withProviderConsumer(Breadcrumbs, ['activeAdviser']);
