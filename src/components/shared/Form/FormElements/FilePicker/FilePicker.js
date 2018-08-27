import React, { Component } from 'react';

import PropTypes from 'prop-types';
import FilePickerEmpty from './FilePickerEmpty/FilePickerEmpty';
import FilePickerImageAttached from './FilePickerImageAttached/FilePickerImageAttached';

class FilePicker extends Component {
  state = {
    imageName: this.props.imageName || ''
  };

  removeImage = () => {
    this.setState({ imageName: '' }, () => this.fileChanged(''));
  };

  fileChanged = files => {
    if (this.props.fileChanged) {
      this.props.fileChanged(files);
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ imageName: nextProps.imageName });
  }

  render() {
    return this.state.imageName ? (
      <FilePickerImageAttached
        imageName={this.state.imageName}
        removeImage={this.removeImage}
      />
    ) : (
      <FilePickerEmpty
        fileChanged={this.fileChanged}
        emptyLabel={this.props.emptyLabel}
      />
    );
  }
}

FilePicker.propTypes = {
  state: PropTypes.string
};

export default FilePicker;
