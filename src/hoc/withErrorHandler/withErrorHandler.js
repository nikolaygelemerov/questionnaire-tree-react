import React, { Component, Fragment } from 'react';

import Modal from '../../components/shared/Modal/Modal';
import classes from './withErrorHandler.scss';
import { common } from '../../translations/translations';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
        errorMsg: '',
        requestInterceptor: null,
        responseInterceptor: null,
        showModal: false,
        errorCallback: null
      };

      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({
          error: '',
          errorMsg: req.errorMsg,
          errorCallback: req.errorCallback
        });

        return req;
      });

      axios.interceptors.response.use(
        res => Promise.resolve(res),
        error => {
          const errorMsg = this.state.errorMsg;
          this.setState({
            error: error,
            errorMsg: errorMsg || error.message,
            showModal: true
          });

          return Promise.reject(error);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null, errorMessage: '' });
    };

    render() {
      return (
        <Fragment>
          {this.state.error && (
            <Modal
              title={common.error}
              show={this.state.showModal}
              buttons={null}
              afterModalClose={() => {
                this.state.errorCallback && this.state.errorCallback();
                this.setState({ showModal: false });
              }}
            >
              <div className={classes.ErrorContent}>{this.state.errorMsg}</div>
            </Modal>
          )}
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
