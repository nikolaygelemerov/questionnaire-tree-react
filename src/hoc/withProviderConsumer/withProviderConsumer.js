import React from 'react';

import { ProviderContext } from '../../store/Provider/Provider';

const withProviderConsumer = (Component, extendProps) => {
  return props => {
    return (
      <ProviderContext.Consumer>
        {state => {
          const newProps = extendProps.reduce((accum, element) => {
            accum[element] = state[element];

            return accum;
          }, {});

          const allProps = { ...props, ...newProps };

          return <Component {...allProps} />;
        }}
      </ProviderContext.Consumer>
    );
  };
};

export default withProviderConsumer;
