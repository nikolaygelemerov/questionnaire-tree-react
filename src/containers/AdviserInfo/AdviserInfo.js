import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import classes from './AdviserInfo.scss';
import QuestionnaireTree from './QuestionnaireTree/QuestionnaireTree';
import AllQuestions from './AllQuestions/AllQuestions';
import MainData from './MainData/MainData';
import AdviserInfoNavBar from '../../components/AdviserInfo/AdviserInfoNavBar/AdviserInfoNavBar';
import URLS from '../../constants/urls';
import mainDataState from './MainData/MainDataState';

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
              component={() => <MainData edit={false} />}
            />
            <Route
              exact
              path={`${this.props.match.url}${URLS.allQuestions}`}
              component={AllQuestions}
            />
            <Redirect
              from={`${this.props.match.url}${URLS.allQuestions}/:id`}
              to={`${this.props.match.url}${URLS.allQuestions}`}
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
              component={() => <MainData edit={true} />}
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

export default AdviserInfo;
