import React from 'react';
import SelectSearch from './SelectSearch/index';

import styles from '../../../../../styles/ThirdParty/Multiselect.scss';

const MultiSelect = props => {
  const options = props.options.length < 1 ? [{}] : props.options;
  const value = props.value ? props.value : [];
  return (
    <SelectSearch
      placeholder={props.placeholder}
      height={null}
      options={options}
      multiple={true}
      search={true}
      className={styles.MultiSelect}
      value={value}
      onChange={props.onChange}
    />
  );
};

export default MultiSelect;
