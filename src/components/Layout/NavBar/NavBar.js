import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './NavBar.scss';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import { NAVBAR } from '../../../constants/constants';

class NavBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      positionTop: NAVBAR.positionTop
    };
  }
  componentDidMount() {
    let positionTop = NAVBAR.positionTop;
    window.addEventListener('scroll', () => {
      if (
        window.scrollY > NAVBAR.positionTop &&
        positionTop !== NAVBAR.positionScrolled
      ) {
        positionTop = NAVBAR.positionScrolled;
        this.setState({ positionTop: NAVBAR.positionScrolled });
      } else {
        if (
          window.scrollY <= NAVBAR.positionTop &&
          positionTop !== NAVBAR.positionTop
        ) {
          positionTop = NAVBAR.positionTop;
          this.setState({ positionTop: NAVBAR.positionTop });
        }
      }
    });
  }
  render() {
    return (
      <div className={classes.NavBar} style={{ top: this.state.positionTop }}>
        <div className={classes.TitleRow}>
          <Breadcrumbs pathname={this.props.location.pathname} />
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
