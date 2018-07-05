import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './NavBar.scss';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';

const NavBar = props => {
  return (
    <div className={classes.NavBar}>
      <div className={classes.RedRow} />
      <div className={classes.TitleRow}>
        <Breadcrumbs pathname={props.location.pathname} />
      </div>
    </div>
  );
};

export default withRouter(NavBar);
