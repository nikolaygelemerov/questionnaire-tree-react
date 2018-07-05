import React, { Component } from 'react';

import providerState from './ProviderState';
import * as reducers from '../reducers/index';

export const ProviderContext = React.createContext();

class Provider extends Component {
  state = {
    ...providerState,
    dispatch: action => {
      this.setState(
        state => reducers[action.name](state, action),
        action.callback
      );
    }
  };

  render() {
    return (
      <ProviderContext.Provider value={this.state}>
        {this.props.children}
      </ProviderContext.Provider>
    );
  }
}

export default Provider;
