import React, { Fragment } from 'react';

import NavBar from '../../components/Layout/NavBar/NavBar';
import MainSection from '../../components/Layout/MainSection/MainSection';

const Layout = props => {
  return (
    <Fragment>
      <NavBar />
      <MainSection />
    </Fragment>
  );
};

export default Layout;
