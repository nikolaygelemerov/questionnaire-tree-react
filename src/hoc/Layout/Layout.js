import React, { Fragment } from 'react';

import NavBar from '../../components/Layout/NavBar/NavBar';
import SideNavigation from '../../components/Layout/Sidenavigation/SideNavigation';
import MainSection from '../../components/Layout/MainSection/MainSection';

const Layout = props => {
  return (
    <Fragment>
      <NavBar />
      {/* <SideNavigation /> */}
      <MainSection />
    </Fragment>
  );
};

export default Layout;
