import React, { PureComponent, Fragment } from 'react';

import styles from './Toggler.scss';

class Toggler extends PureComponent {
  state = {
    active: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.toggle !== this.props.toggle) {
      this.setState({ active: this.props.toggle });
    }
  }

  componentDidMount() {
    if (this.props.toggle !== this.state.active) {
      this.setState(prevState => ({ active: !prevState.active }));
    }
  }

  toggle = () => {
    this.setState(prevState => {
      return { active: !prevState.active };
    });
  };

  render() {
    const children = this.state.active ? this.props.children : null;

    const arrowClasses = this.state.active
      ? [styles.ArrowIcon, styles.Active]
      : [styles.ArrowIcon, styles.InActive];

    const scroll = this.props.scroll
      ? { overflowY: 'auto', overflowX: 'hidden', height: '96%' }
      : null;
    return (
      <Fragment>
        <div
          className={styles.TogglerWrapper}
          onClick={
            this.props.toggleAction ? this.props.toggleAction : this.toggle
          }
        >
          <div className={styles.TogglerTitle}>{this.props.title}</div>
          <div className={arrowClasses.join(' ')} />
        </div>
        <div style={scroll}>{children}</div>
      </Fragment>
    );
  }
}

export default Toggler;
