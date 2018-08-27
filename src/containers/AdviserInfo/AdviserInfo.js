import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import classes from './AdviserInfo.scss';
import QuestionnaireTree from './QuestionnaireTree/QuestionnaireTree';
import AllQuestions from './AllQuestions/AllQuestions';
import MainData from './MainData/MainData';
import AdviserInfoNavBar from '../../components/AdviserInfo/AdviserInfoNavBar/AdviserInfoNavBar';
import URLS from '../../constants/urls';
import withProviderConsumer from '../../hoc/withProviderConsumer/withProviderConsumer';

class AdviserInfo extends Component {
  render() {
    return (
      <Fragment>
        <AdviserInfoNavBar />
        <div className={classes.AdviserInfo}>
          <Switch>
            <Route
              exact
              path={`${this.props.match.url}`}
              component={MainData}
            />
            <Route
              exact
              path={`${this.props.match.url}${URLS.allQuestions}`}
              component={AllQuestions}
            />
            <Route
              exact
              path={`${this.props.match.url}${URLS.allQuestions}/:id`}
              component={AllQuestions}
            />
            <Route
              exact
              path={`${this.props.match.url}${URLS.questionnaireTree}`}
              component={QuestionnaireTree}
            />
            <Route
              exact
              path={`${this.props.match.url}${URLS.questionnaireTree}/:id`}
              component={QuestionnaireTree}
            />
            <Route
              exact
              path={`${this.props.match.url}/:id`}
              component={MainData}
            />
            <Redirect
              from={`${this.props.match.url}/:id`}
              to={`${this.props.match.url}`}
            />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default withProviderConsumer(AdviserInfo, ['activeAdviser']);
