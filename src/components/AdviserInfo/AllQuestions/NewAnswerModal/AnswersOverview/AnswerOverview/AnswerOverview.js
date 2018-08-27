import React, { Fragment } from 'react';

import styles from './AnswerOverview.scss';
import buttons from '../../../../../../styles/_buttons.scss';
import { createAnswer as translations } from '../../../../../../translations/translations';
import Checkbox from '../../../../../shared/Checkbox/Checkbox';
import DeactivateAnswerBlock from '../DeactivateAnswerBlock/DeactivateAnswerBlock';
import { idGenerator } from '../../../../../../services/helpers';
import { QUESTION } from '../../../../../../constants/constants';

const AnswerOverview = props => {
  const filters = props.menuFilters
    .concat(props.numericFilters)
    .concat(props.specialFilters);
  const propertyIdsList = [];
  const filtersJsx = [];

  //remove filters with same property
  filters.forEach(element => {
    if (!propertyIdsList.includes(element.propertyId)) {
      propertyIdsList.push(element.propertyId);
      filtersJsx.push(
        <div key={element.id} className={styles.FilterText}>
          {element.propertyGroupName}({element.propertyName})
        </div>
      );
    }
  });

  const isFirst = props.index === 0;
  const isLast = props.index === props.answersCount;

  const upArrowStyles = isFirst
    ? [styles.ArrowUp, styles.Disabled]
    : [styles.ArrowUp];

  const downArrowStyles = isLast
    ? [styles.ArrowDown, styles.Disabled]
    : [styles.ArrowDown];

  const warning = props.showWarning ? (
    <DeactivateAnswerBlock
      answerId={props.id}
      activeAdviser={props.activeAdviser}
      closeWarning={props.closeDeactivateWarning}
      deactivateAnswer={props.deactivateAnswer}
    />
  ) : null;

  const deleteIcon = !props.isActive ? (
    <div
      className={buttons.Delete}
      onClick={() => props.deleteAnswer(props.id)}
    />
  ) : null;

  const imageClasses =
    props.questionType === QUESTION.typeCheckbox
      ? `${styles.Image} ${styles.Checkbox}`
      : `${styles.Image}`;
  const image = props.image ? (
    <img
      alt={props.image}
      className={imageClasses}
      src={`${props.image}?${idGenerator()}`}
    />
  ) : (
    <div className={styles.Image} />
  );

  return (
    <Fragment>
      <div className={styles.Wrapper}>
        <div className={styles.Header}>
          <div className={styles.Title}>{props.answer}</div>
          <div className={styles.Actions}>
            <div className={styles.Active}>
              <Checkbox
                isChecked={props.isActive}
                updateCheckBoxHandler={() =>
                  props.isActive
                    ? props.showDeactivateWarning(props.id)
                    : props.updateIsAnswerActive(props.id)
                }
              />
            </div>
            <div
              className={buttons.Edit}
              onClick={() => props.editAnswer(props.id)}
            />
            {deleteIcon}
            <div className={styles.Reorder}>
              <div
                className={upArrowStyles.join(' ')}
                onClick={() =>
                  props.reorderAnswer(props.index, props.index - 1)
                }
              />
              <div
                className={downArrowStyles.join(' ')}
                onClick={() =>
                  props.reorderAnswer(props.index, props.index + 1)
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.Content}>
          <div className={styles.DescriptionWrapper}>
            <div className={styles.DescriptionTitle}>
              {translations.descriptionTitle}
            </div>
            <div className={styles.Description}>{props.additionalText}</div>
          </div>
          <div className={styles.FiltersWrapper}>
            <div className={styles.Filters}>
              <div className={styles.FiltersTitle}>
                {translations.filtersTitle}
              </div>
              <div className={styles.FiltersText}>{filtersJsx}</div>
            </div>
          </div>
          {image}
        </div>
      </div>
      {warning}
    </Fragment>
  );
};

export default AnswerOverview;
