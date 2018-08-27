import React from 'react';

import styles from './FilterBlock.scss';
import Toggler from '../../../../../shared/Toggler/Toggler';
import FormElement from '../../../../../shared/Form/FormElements/FormElement';
import { createAnswer as translations } from '../../../../../../translations/translations';

const FilterBlock = props => {
  const { fields } = props.filter;

  const fieldsJsx = Object.keys(fields).map(el => {
    return fields[el].hidden === true ? null : (
      <FormElement
        required={fields[el].required}
        validationRequired={fields[el].validationRequired}
        styles={fields[el].styles}
        changed={event => props.filterFieldChange(event, props.filter.id, el)}
        key={fields[el].key}
        label={fields[el].label}
        elementType={fields[el].elementType}
        elementConfig={fields[el].config}
        value={fields[el].value}
      />
    );
  });
  return (
    <div className={styles.Wrapper}>
      <Toggler title={props.name}>
        {fieldsJsx}
        <div className={styles.RemoveFilter}>
          <div
            className={styles.DeleteWrapper}
            onClick={() => props.deleteFilter(props.filter.id)}
          >
            <div className={styles.Delete} />
            <div className={styles.Text}>{translations.deleteFilters}</div>
          </div>
        </div>
      </Toggler>
    </div>
  );
};

export default FilterBlock;
