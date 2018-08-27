import React from 'react';

import classes from './Filters.scss';

const FilterCard = props => {
  const propertyIdsList = [];
  const answersFiltersJsx = [];

  props.answers.forEach(answer => {
    const filters = answer.menuFilters
      .concat(answer.numericFilters)
      .concat(answer.specialFilters);

    //remove filters with same property
    filters.forEach(filter => {
      if (!propertyIdsList.includes(filter.propertyId)) {
        propertyIdsList.push(filter.propertyId);
        answersFiltersJsx.push(
          <p key={filter.propertyOptionId} className={classes.FilterName}>
            {filter.propertyGroupName}({filter.propertyName})
          </p>
        );
      }
    });
  });
  return <div className={classes.Filter}>{answersFiltersJsx}</div>;
};

export default FilterCard;
