import React, { Component } from 'react';

import Provider from '../../store/Provider/Provider';
import Layout from '../../hoc/Layout/Layout';

class App extends Component {
  render() {
    return (
      <Provider>
        <Layout />
      </Provider>
    );
  }
}

export default App;
