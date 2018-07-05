import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import classes from './MainSection.scss';
import AdviserMenu from '../../../containers/AdviserMenu/AdviserMenu';
import AdviserInfo from '../../../containers/AdviserInfo/AdviserInfo';
import URLS from '../../../constants/urls';

const MainSection = props => {
  return (
    <div className={classes.MainSection}>
      <Switch>
        <Route path={URLS.root} exact component={AdviserMenu} />
        <Route path={URLS.mainData} component={AdviserInfo} />
        <Redirect from={`${URLS.root}:id`} to={URLS.root} />
      </Switch>
    </div>
  );
};

export default MainSection;
